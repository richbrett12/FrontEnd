namespace BackendForFrontEndApi.Models;

public class ReservationsDatabaseSettings
{
    public static string SectionName = "ReservationsDatabase";
    public string ConnectionString { get; set; } = "";
    public string DatabaseName { get; set; } = "";
    public string ReservationsCollectionName { get; set; } = "";
}

