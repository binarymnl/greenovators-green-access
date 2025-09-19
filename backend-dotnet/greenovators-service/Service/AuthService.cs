using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using greenovators_service.Models.Data;
using Microsoft.IdentityModel.Tokens;

namespace greenovators_service.Service
{
    public class AuthService
    {
        private readonly List<User> _users = new();

        public AuthService()
        {
            // Seed demo user
            _users.Add(new User { Username = "user1", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123") });
        }

        public string? Login(string username, string password)
        {
            var user = _users.FirstOrDefault(u => u.Username == username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return null;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim("username", user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Mmbe8W3wduIUhBX2jDCREVWW0lu9zdnw"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "green-ai",
                audience: "green-ai",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}