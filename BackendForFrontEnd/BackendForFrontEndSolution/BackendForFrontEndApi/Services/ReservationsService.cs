using Microsoft.Extensions.Options;

using MongoDB.Driver;

namespace BackendForFrontEndApi.Services;

public class ReservationsService
{
    private readonly IMongoCollection<Reservation> _reservationsCollection;

    public ReservationsService(IOptions<ReservationsDatabaseSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

        _reservationsCollection = mongoDatabase.GetCollection<Reservation>(settings.Value.ReservationsCollectionName);
    }

    public async Task<List<Reservation>> GetAllAsync() => await _reservationsCollection.Find(_=> true).ToListAsync();

    public async Task<List<Reservation>> GetAllForUserAsync(string userId) => await _reservationsCollection.Find(m => m.User == userId).ToListAsync();

    public async Task CreateAsync(Reservation reservation) => await _reservationsCollection.InsertOneAsync(reservation);
}
