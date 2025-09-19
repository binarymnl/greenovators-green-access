using Microsoft.AspNetCore.SignalR;

namespace greenovators_service.Controllers
{
    public class DashboardHub : Hub
    {
        public async Task BroadcastUpdate(string message)
        {
            await Clients.All.SendAsync("ReceiveUpdate", message);
        }
    }
}