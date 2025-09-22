using Microsoft.ML;
using Microsoft.ML.Data;
using greenovators_service.Models.Data;
using Microsoft.ML.Transforms.TimeSeries;

namespace greenovators_service.Service
{
    public class ForecastService
    {
        private readonly MLContext _ml;

        public ForecastService() => _ml = new MLContext();

        public class EnergyRecord
        {
            public float Energy_kWh { get; set; }
            public DateTime Timestamp { get; set; }
        }

        private class EnergyForecast
        {
            [VectorType(24)]
            public float[] ForecastedEnergy { get; set; }
        }

        public SuggestedSlot GenerateSuggestion(string userId, IEnumerable<CheckinEvent> history)
        {
            var energyHistory = history
                .GroupBy(h => h.CheckInTime.Hour)
                .Select(g => new EnergyRecord
                {
                    Timestamp = DateTime.UtcNow.Date.AddHours(g.Key),
                    Energy_kWh = g.Count() // proxy: occupancy → energy
                })
                .ToList();

            if (!energyHistory.Any() || energyHistory.Count < 10)
            {
                return new SuggestedSlot
                {
                    UserId = userId,
                    SuggestedStart = new TimeSpan(10,0,0),
                    SuggestedEnd = new TimeSpan(16,0,0),
                    Reason = "Default off-peak (no history)"
                };
            }

            var data = _ml.Data.LoadFromEnumerable(energyHistory);
            
            int seriesLength = energyHistory.Count;

            if (seriesLength < 10)
            {
                return new SuggestedSlot
                {
                    UserId = userId,
                    SuggestedStart = new TimeSpan(10, 0, 0),
                    SuggestedEnd = new TimeSpan(12, 0, 0),
                    Reason = "Not enough data for ML model, using fallback heuristic"
                };
            }

            // ✅ Calculate params safely
            int windowSize = Math.Max(2, seriesLength / 4);          // small window
            int trainSize  = Math.Max(windowSize * 2 + 1, seriesLength - 1);
            int horizon    = Math.Min(24, seriesLength / 2);         // avoid asking for too much

            var forecastingPipeline = _ml.Forecasting.ForecastBySsa(
                outputColumnName: "ForecastedEnergy",
                inputColumnName: nameof(EnergyRecord.Energy_kWh),
                windowSize: windowSize,
                seriesLength: seriesLength,
                trainSize: trainSize,
                horizon: horizon);


            var model = forecastingPipeline.Fit(data);
            var forecastEngine = model.CreateTimeSeriesEngine<EnergyRecord, EnergyForecast>(_ml);
            var forecast = forecastEngine.Predict();

            var minIndex = Array.IndexOf(forecast.ForecastedEnergy, forecast.ForecastedEnergy.Min());
            var suggestedStart = DateTime.UtcNow.Date.AddHours(minIndex + 1).TimeOfDay;

            return new SuggestedSlot
            {
                UserId = userId,
                SuggestedStart = suggestedStart,
                SuggestedEnd = suggestedStart.Add(TimeSpan.FromHours(2)),
                Reason = "Predicted low energy usage from ML model"
            };
        }
    }
}
