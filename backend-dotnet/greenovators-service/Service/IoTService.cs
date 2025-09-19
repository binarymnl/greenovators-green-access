namespace greenovators_service.Service
{
    public class IoTService
    {
        public void LightsOff(string zone)
        {
            Console.WriteLine($"[IoT] Lights turned off in {zone}");
            // Here you’d call MQTT publish: building/{zone}/lights = off
        }
    }
}