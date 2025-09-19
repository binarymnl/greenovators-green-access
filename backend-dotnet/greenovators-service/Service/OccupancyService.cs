using greenovators_service.Models.Data;

namespace greenovators_service.Service
{
    public class OccupancyService
    {
        private readonly List<CheckinEvent> _events = new();
        private readonly IoTService _iot;
        private readonly ReportService _report;

        public OccupancyService(IoTService iot, ReportService report)
        {
            _iot = iot;
            _report = report;
        }

        public void RecordEvent(CheckinEvent ev)
        {
            _events.Add(ev);

            if (ev.Action == EventType.Checkout)
            {
                var activeUsers = _events
                    .Where(e => e.Zone == ev.Zone)
                    .GroupBy(e => e.UserId)
                    .Select(g => g.OrderByDescending(e => e.Timestamp).First())
                    .Count(e => e.Action == EventType.Checkin);

                if (activeUsers != 0) return;

                // trigger IoT event
                _iot.LightsOff(ev.Zone);
                // update ESG report
                _report.AddEnergySaved(ev.Zone, 1.4, 1.1);
            }
        }
    }
}