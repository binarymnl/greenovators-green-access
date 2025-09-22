namespace greenovators_service.Service
{
    public class IoTService
    {
        private readonly HttpClient _httpClient;
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _baseUrl;

        public IoTService(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _clientId = configuration["TuyaSettings:ClientId"] ?? throw new ArgumentNullException("ClientId");
            _clientSecret = configuration["TuyaSettings:ClientSecret"] ?? throw new ArgumentNullException("ClientSecret");
            _baseUrl = configuration["TuyaSettings:BaseUrl"] ?? throw new ArgumentNullException("BaseUrl");
        }

        /// <summary>
        /// Generates a signature for Tuya API requests per Tuya's HMAC-SHA256 requirements.
        /// </summary>
        private string GenerateSignature(string timestamp, string method, string path, string accessToken = "", string body = "")
        {
            // Use SHA256 hash of an empty string for GET requests or empty body
            var bodyHash = string.IsNullOrEmpty(body)
                ? "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                : BitConverter.ToString(SHA256.HashData(Encoding.UTF8.GetBytes(body))).Replace("-", "").ToLower();

            // Construct the string to sign: method, body hash, empty header hash, and path
            var stringToSign = $"{method}\n{bodyHash}\n\n{path}";
            var message = $"{_clientId}{accessToken}{timestamp}{stringToSign}";

            // Debug logging to diagnose signature issues
            Console.WriteLine($"DEBUG: timestamp={timestamp}");
            Console.WriteLine($"DEBUG: stringToSign={stringToSign}");
            Console.WriteLine($"DEBUG: message={message}");

            // Generate HMAC-SHA256 signature
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_clientSecret));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
            var sign = BitConverter.ToString(hash).Replace("-", "").ToUpper();

            Console.WriteLine($"DEBUG: sign={sign}");
            return sign;
        }

        /// <summary>
        /// Retrieves an access token from Tuya's API.
        /// </summary>
        public async Task<string> GetAccessTokenAsync()
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
            var path = "/v1.0/token?grant_type=1";

            var sign = GenerateSignature(timestamp, "GET", path);

            var request = new HttpRequestMessage(HttpMethod.Get, $"{_baseUrl}{path}");
            request.Headers.Add("client_id", _clientId);
            request.Headers.Add("sign", sign);
            request.Headers.Add("t", timestamp);
            request.Headers.Add("sign_method", "HMAC-SHA256");

            var response = await _httpClient.SendAsync(request);
            var json = await response.Content.ReadAsStringAsync();

            Console.WriteLine("RAW TUYA RESPONSE: " + json);

            var parsed = JObject.Parse(json);
            var token = parsed["result"]?["access_token"]?.ToString();

            if (string.IsNullOrEmpty(token))
            {
                var errorCode = parsed["code"]?.ToString();
                var errorMsg = parsed["msg"]?.ToString() ?? "Unknown error";
                throw new Exception($"Unable to retrieve access token. Tuya Response: Code {errorCode}, Message: {errorMsg}");
            }

            return token;
        }

        /// <summary>
        /// Sends a command to turn a device ON or OFF.
        /// </summary>
        public async Task<string> ControlDeviceAsync(string deviceId, bool turnOn)
        {
            var token = await GetAccessTokenAsync();
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
            var path = $"/v1.0/devices/{deviceId}/commands";

            var body = new
            {
                commands = new[]
                {
                    new { code = "switch_1", value = turnOn }
                }
            };
            var jsonBody = Newtonsoft.Json.JsonConvert.SerializeObject(body);

            var sign = GenerateSignature(timestamp, "POST", path, token, jsonBody);

            var request = new HttpRequestMessage(HttpMethod.Post, $"{_baseUrl}{path}")
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };

            request.Headers.Add("client_id", _clientId);
            request.Headers.Add("access_token", token);
            request.Headers.Add("sign", sign);
            request.Headers.Add("t", timestamp);
            request.Headers.Add("sign_method", "HMAC-SHA256");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}