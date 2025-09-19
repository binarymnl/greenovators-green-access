using greenovators_service.Service;
using Microsoft.AspNetCore.Mvc;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _auth;

        public AuthController(AuthService auth) => _auth = auth;

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var token = _auth.Login(request.Username, request.Password);
            if (token == null) return Unauthorized();
            return Ok(new { token });
        }

        public record LoginRequest(string Username, string Password);
    }
}