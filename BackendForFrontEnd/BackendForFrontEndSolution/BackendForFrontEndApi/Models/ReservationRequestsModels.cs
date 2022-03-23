using System.ComponentModel.DataAnnotations;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendForFrontEndApi;

public record PostReservationRequestModel
{
    [Required]
    public string User { get; init; } = "";
    [Required]
    public PostReservationRequestDetailsModel Details { get; init; } = new();
}

public record PostReservationRequestDetailsModel
{
    [Required]
    public string SiteId { get; init; } = "";
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public decimal Total { get; init; }
}


public record Reservation
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; init; } = "";
    public DateTime Created { get; init; } = DateTime.Now;
    public string User { get; init; } = "";
    public string SiteId { get; init; } = "";
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public decimal Total { get; init; }

    public ReservationStatus Status { get; init; } = ReservationStatus.Processing;
    public string? DenialReason { get; init; }
}

public enum ReservationStatus {  Processing, Accepted, Denied }