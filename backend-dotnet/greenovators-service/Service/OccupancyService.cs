using greenovators_service.Controllers;
using greenovators_service.Infrastructure;
using greenovators_service.Models.Data;
using Microsoft.AspNetCore.SignalR;

namespace greenovators_service.Service
{
    public class OccupancyService
    {
        private readonly List<CheckinEvent> _events = new();
        private readonly IoTService _iot;
        private readonly ReportService _report;
        private readonly AppDbContext _dbContext;
        private readonly IHubContext<DashboardHub> _hub;

        public OccupancyService(IoTService iot, ReportService report, AppDbContext dbContext, IHubContext<DashboardHub> hub)
        {
            _iot = iot;
            _report = report;
            _dbContext = dbContext;
            _hub = hub;
        }

        public async Task RecordEvent(CheckinEvent ev)
        {
            bool isDbCallRequired = false;

            var customer = _dbContext.Customers.FirstOrDefault(x=>x.CustomerId == ev.UserId);

            if (customer is null)
            {
                isDbCallRequired = true;
                _dbContext.Customers.Add(new Customer {CustomerId = ev.UserId});
            }
            
            var entry = _dbContext.CheckinEvents.FirstOrDefault(x=>x.UserId == ev.UserId && x.Zone == ev.Zone);
            
            // Get the last entry for this user to check its type
            var lastEntry = _dbContext.CheckinEvents
                .Where(x => x.UserId == ev.UserId && x.Zone == ev.Zone)
                .OrderByDescending(x => x.Id)
                .FirstOrDefault();
            
            if (entry is not null && lastEntry is not null && lastEntry.Action == EventType.Checkin && ev.CheckOutTime.HasValue && ev.CheckOutTime.Value.Date == entry.CheckInTime.Date)
            {
                isDbCallRequired = true;
                lastEntry.CheckOutTime = ev.CheckOutTime;
                lastEntry.Action = EventType.Checkout;
                _dbContext.CheckinEvents.Update(lastEntry);
                
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
            else if (ev.Action == EventType.Checkin && (lastEntry == null || lastEntry.Action == EventType.Checkout))
            {
                // Only add a new checkin if there's no previous entry or the last entry was a checkout
                isDbCallRequired = true;
                _dbContext.CheckinEvents.Add(ev);
            }
            
            if(isDbCallRequired) _dbContext.SaveChanges();
            
            var activeUsers = _dbContext.CheckinEvents
                .Where(e => e.Zone == ev.Zone && e.CheckInTime.Date == DateTime.UtcNow.Date && e.Action == EventType.Checkin)
                .GroupBy(e => e.UserId)
                .Select(g => g.OrderByDescending(e => e.CheckInTime).First())
                .Count(e => e.Action == EventType.Checkin);



            if (activeUsers != 0 && ev.Action == EventType.Checkin)
            {
                await _iot.ControlDeviceAsync("d73412c1be89703fe6wcpr", true);
                await _hub.Clients.All.SendAsync("LightsON", 1);
                return;
            }

            if (activeUsers == 0 && ev.Action == EventType.Checkout)
            {
                // trigger IoT event
                await _iot.ControlDeviceAsync("d73412c1be89703fe6wcpr", false);
                await _hub.Clients.All.SendAsync("LightsOff", 2);
                
                // update ESG report
                _report.AddEnergySaved(ev.Zone, 1.4, 1.1);
            }
        }
    }
}