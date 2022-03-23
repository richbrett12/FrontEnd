namespace BackendForFrontEndApi.Services;

public class MongoReservationProcessor : IProcessReservations
{
    private readonly ReservationsService _service;

    public MongoReservationProcessor(ReservationsService service)
    {
        _service = service;
    }

    public async Task<Reservation> AddReservationAsync(PostReservationRequestModel model)
    {
        var response = new Reservation
        {
            Created = DateTime.Now,
            User = model.User,
            SiteId = model.Details.SiteId,
            StartDate = model.Details.StartDate,
            EndDate = model.Details.EndDate,
            Total = model.Details.Total,
            Status = ReservationStatus.Processing
        };

        await _service.CreateAsync(response);
        return response;
    }

    public async Task<List<Reservation>> GetReservationsForUserAsync(string userId)
    {
        return await _service.GetAllForUserAsync(userId);
    }
}
