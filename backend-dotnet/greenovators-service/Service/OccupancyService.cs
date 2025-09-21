using greenovators_service.Infrastructure;
using greenovators_service.Models.Data;

namespace greenovators_service.Service
{
    public class OccupancyService
    {
        private readonly List<CheckinEvent> _events = new();
        private readonly IoTService _iot;
        private readonly ReportService _report;
        private readonly AppDbContext _dbContext;

        public OccupancyService(IoTService iot, ReportService report, AppDbContext dbContext)
        {
            _iot = iot;
            _report = report;
            _dbContext = dbContext;
        }

        public void RecordEvent(CheckinEvent ev)
        {
            // _events.Add(ev);
            
            bool isDbCallRequired = false;

            var customer = _dbContext.Customers.FirstOrDefault(x=>x.CustomerId == ev.UserId);

            if (customer is null)
            {
                isDbCallRequired = true;
                _dbContext.Customers.Add(new Customer {CustomerId = ev.UserId});
            }
            
            var entry = _dbContext.CheckinEvents.FirstOrDefault(x=>x.UserId == ev.UserId && x.Zone == ev.Zone);
            if (entry is not null && entry.Action == EventType.Checkin && ev.CheckOutTime.HasValue && ev.CheckOutTime.Value.Date == entry.CheckInTime.Date)
            {
                isDbCallRequired = true;
                entry.CheckOutTime = ev.CheckOutTime;
                entry.Action = EventType.Checkout;
                _dbContext.CheckinEvents.Update(entry);
                
                // reward check
                var todaySlot = _dbContext.SuggestedSlots
                    .FirstOrDefault(s => s.UserId == ev.UserId && s.CreatedAt.Date == DateTime.UtcNow.Date);

                if (todaySlot != null &&
                    ev.CheckInTime.TimeOfDay >= todaySlot.SuggestedStart &&
                    ev.CheckInTime.TimeOfDay <= todaySlot.SuggestedEnd)
                {
                    entry.RewardPoints = 10;
                    customer = _dbContext.Customers.FirstOrDefault(u => u.CustomerId == ev.UserId);
                    if (customer != null)
                    {
                        customer.RewardPoints += 10;
                        _dbContext.Customers.Update(customer);
                    }
                   
                }
            }
            else if (ev.Action == EventType.Checkin)
            {
                isDbCallRequired = true;
                _dbContext.CheckinEvents.Add(ev);
            }
            
            if( isDbCallRequired ) _dbContext.SaveChanges();

            // if (ev.Action == EventType.Checkout)
            // {
            //     var activeUsers = _events
            //         .Where(e => e.Zone == ev.Zone)
            //         .GroupBy(e => e.UserId)
            //         .Select(g => g.OrderByDescending(e => e.CheckInTime).First())
            //         .Count(e => e.Action == EventType.Checkin);
            //
            //     if (activeUsers != 0) return;
            //
            //     // trigger IoT event
            //     _iot.LightsOff(ev.Zone);
            //     // update ESG report
            //     _report.AddEnergySaved(ev.Zone, 1.4, 1.1);
            // }
        }
    }
}