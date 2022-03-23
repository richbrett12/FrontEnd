
namespace BackendForFrontEndApi.Controllers;

[ApiController]
public class ReservationRequestsController : ControllerBase
{
    private readonly IProcessReservations _reservationService;

    public ReservationRequestsController(IProcessReservations reservationService)
    {
        _reservationService = reservationService;
    }

    [HttpPost("reservation-requests")]
    public async Task<ActionResult> RequestReservation([FromBody] PostReservationRequestModel model)
    {
        Reservation response = await _reservationService.AddReservationAsync(model);
        return Ok(response);
    }

    [HttpGet("reservation-requests/{userId}")]
    public async Task<ActionResult> GetReservationRequestsForUserAsync(string userId)
    {
        List<Reservation> response = await _reservationService.GetReservationsForUserAsync(userId);

        return Ok(new {data = response});
    }
}


