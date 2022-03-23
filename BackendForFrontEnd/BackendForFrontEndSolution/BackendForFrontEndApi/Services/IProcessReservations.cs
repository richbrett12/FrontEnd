namespace BackendForFrontEndApi.Services;

public interface IProcessReservations
{
    Task<Reservation> AddReservationAsync(PostReservationRequestModel model);
    Task<List<Reservation>> GetReservationsForUserAsync(string userId);
}
