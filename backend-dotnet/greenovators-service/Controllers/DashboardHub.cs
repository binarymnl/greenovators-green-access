using Microsoft.AspNetCore.SignalR;

namespace greenovators_service.Controllers
{
    public class DashboardHub : Hub
    {
        public Task SubscribeZone(string zone) => Groups.AddToGroupAsync(Context.ConnectionId, zone);
        public Task UnsubscribeZone(string zone) => Groups.RemoveFromGroupAsync(Context.ConnectionId, zone);
    }
}