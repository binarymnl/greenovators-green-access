using greenovators_service.Models.Data;

namespace greenovators_service.Service
{
    public class ReportService
    {
        private readonly List<ReportEntry> _entries = new();

        public void AddEnergySaved(string zone, double kWh, double co2)
        {
            _entries.Add(new ReportEntry
            {
                Zone = zone,
                EnergySavedKWh = kWh,
                CO2AvoidedKg = co2
            });
        }

        public IEnumerable<ReportEntry> GetReports() => _entries;
    }
}