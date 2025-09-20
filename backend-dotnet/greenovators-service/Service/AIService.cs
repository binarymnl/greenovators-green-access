namespace greenovators_service.Service
{
    public class AiService
    {
        private readonly HttpClient _http;
        public AiService(IConfiguration config, IHttpClientFactory factory)
        {
            _http = factory.CreateClient("ai");
            var baseUrl = config["AiService:BaseUrl"];
            if (baseUrl != null) _http.BaseAddress = new Uri(baseUrl);
        }

        public async Task<object?> AnalyzeLast7DaysAsync(string zone)
        {
            // POST { zone, start, end } and return dynamic object
            var payload = new {
                zone,
                start = DateTime.UtcNow.AddDays(-7),
                end = DateTime.UtcNow
            };
            try
            {
                var resp = await _http.PostAsJsonAsync("/forecast", payload);
                if (!resp.IsSuccessStatusCode) return null;
                var obj = await resp.Content.ReadFromJsonAsync<object>().ConfigureAwait(false);
                return obj;
            }
            catch { return null; }
        }
    }
}