

using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using greenovators_service.Service;
using Microsoft.AspNetCore.Http.HttpResults;

namespace greenovators_service.Controllers
{
    public class IoTController : ControllerBase
    {
        private readonly IoTService _tuyaService;


        public IoTController(IoTService tuyaService)
        {
            _tuyaService = tuyaService;
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            var token = await _tuyaService.GetAccessTokenAsync();
            return Ok(token);
        }

        [HttpPost("device/on")]
        public async Task<IActionResult> TurnDeviceOn([FromQuery] string deviceId)
        {
            var result = await _tuyaService.ControlDeviceAsync(deviceId, true);
            return Ok(result);
        }

        [HttpPost("device/off")]
        public async Task<IActionResult> TurnDeviceOff([FromQuery] string deviceId)
        {
            var result = await _tuyaService.ControlDeviceAsync(deviceId, false);
            return Ok(result);
        }
    }
}


