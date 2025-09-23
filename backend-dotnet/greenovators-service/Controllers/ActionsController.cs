using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("admin/actions")]
    public class ActionsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ActionsController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> Get() {
            var actions = await _db.Recommendations.Select(x=>x.Suggestion).ToListAsync();
            return Ok(actions);
        }

        [HttpPost("{key}/enable")]
        public async Task<IActionResult> Enable(string key, [FromBody] EnableRequest req) {
            var action = await _db.ActionItems.FirstOrDefaultAsync(a => a.Key == key);
            if (action == null) return NotFound();
            action.Enabled = req.Enabled;
            await _db.SaveChangesAsync();
            return Ok(new { id = action.Key, status = action.Enabled ? "enabled" : "disabled" });
        }

        public record EnableRequest(bool Enabled);
    }
}