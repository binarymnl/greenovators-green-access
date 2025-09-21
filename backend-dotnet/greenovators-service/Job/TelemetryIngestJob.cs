using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using greenovators_service.Controllers;
using greenovators_service.Infrastructure;
using greenovators_service.Models.Data;
using greenovators_service.Service;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Quartz;

namespace greenovators_service.Job
{
    [DisallowConcurrentExecution]
    public class TelemetryIngestJob : IJob
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
        private readonly IHubContext<DashboardHub> _hub;
        private readonly AiService _ai;
        private readonly ILogger<TelemetryIngestJob> _logger;

        public TelemetryIngestJob(AppDbContext db, IConfiguration config, IHubContext<DashboardHub> hub, AiService ai, ILogger<TelemetryIngestJob> logger)
        {
            _db = db; _config = config; _hub = hub; _ai = ai; _logger = logger;
        }

        public Task Execute(IJobExecutionContext context)
        {
            return Task.CompletedTask;

            // var csvPath = _config["Telemetry:CsvFilePath"];
            // if (!string.IsNullOrEmpty(csvPath) && File.Exists(csvPath))
            // {
            //     await IngestFromCsv(csvPath);
            // }
            // else
            // {
            //     await GenerateSyntheticTelemetry();
            // }
            //
            // // After inserting, for each zone run AI analysis and notify clients
            // var zones = await _db.FacilityEvents.Select(e => e.Zone).Distinct().ToListAsync();
            // foreach (var zone in zones)
            // {
            //     var aiResult = await _ai.AnalyzeLast7DaysAsync(zone);
            //     // store AI result into ReportEntries or ActionItems if needed (not implemented)
            //     await _hub.Clients.All.SendAsync("AiAnalysisUpdated", new { zone, ai = aiResult });
            // }
            //
            // // Notify raw latest telemetry
            // var latest = await _db.FacilityEvents.OrderByDescending(e => e.Timestamp).Take(10).ToListAsync();
            // await _hub.Clients.All.SendAsync("TelemetryUpdated", latest);
        }

        private async Task IngestFromCsv(string csvPath)
        {
            var cfg = new CsvConfiguration(CultureInfo.InvariantCulture) { MissingFieldFound = null, HeaderValidated = null };
            using var reader = new StreamReader(csvPath);
            using var csv = new CsvReader(reader, cfg);
            // Map headers from your file names to properties
            var records = csv.GetRecords<dynamic>().ToList();
            foreach (var r in records)
            {
                try
                {
                    // parse fields carefully; this is example based on provided sample columns
                    DateTime ts = DateTime.Parse((string)r.timestamp);
                    var zone = (string)r.zone;
                    double.TryParse((string)r.energy_kWh, out var energy);
                    double.TryParse((string)r.temp_C, out var temp);
                    double.TryParse((string)r.co2_ppm, out var co2);
                    double.TryParse((string)r.pv_output_kW, out var pv);

                    var ev = new FacilityEvent {
                        Timestamp = ts,
                        Zone = zone,
                        EnergyKWh = energy,
                        TempC = temp,
                        Co2Ppm = co2,
                        PvOutputKW = pv,
                        UserId = r.user_id,
                        DoorId = r.door_id,
                        DoorAction = r.door_action,
                        AuthMethod = r.auth_method,
                        LockerId = r.locker_id,
                        LockerAction = r.locker_action,
                        LockerDurationMin = int.TryParse((string)r.locker_duration_min, out var d) ? d : (int?)null,
                        EventId = r.event_id,
                        EventName = r.event_name,
                        TicketsSold = int.TryParse((string)r.tickets_sold, out var tsold) ? tsold : (int?)null,
                        ExpectedAttendance = int.TryParse((string)r.expected_attendance, out var exp) ? exp : (int?)null
                    };
                    _db.FacilityEvents.Add(ev);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("CSV ingest parse error: {ex}", ex.Message);
                }
            }
            await _db.SaveChangesAsync();
        }

        private async Task GenerateSyntheticTelemetry()
        {
            var rnd = new Random();
            var zones = new[] { "GymHall", "LockerRoom", "PoolArea" };
            foreach (var z in zones)
            {
                var ev = new FacilityEvent {
                    Timestamp = DateTime.UtcNow,
                    Zone = z,
                    EnergyKWh = Math.Round(2 + rnd.NextDouble() * 8, 2),
                    TempC = Math.Round(20 + rnd.NextDouble() * 8, 1),
                    Co2Ppm = 450 + rnd.Next(300),
                    PvOutputKW = Math.Round(rnd.NextDouble() * 30, 2),
                    DoorAction = rnd.Next(2) == 0 ? "entry" : "exit",
                    AuthMethod = rnd.Next(2) == 0 ? "NFC Card" : "Mobile App",
                };

                if (ev.Zone == "GymHall")
                {
                    ev.DoorAction = rnd.Next(2) == 0 ? "open" : "close";
                    ev.LockerId = Guid.NewGuid().ToString();
                    ev.LockerDurationMin = rnd.Next(1,60);
                }
                
                _db.FacilityEvents.Add(ev);
            }
            await _db.SaveChangesAsync();
        }
    }
}
