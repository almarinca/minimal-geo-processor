from .schemas import GeoBounds, GeoCentroid, GeoPoint, GeoSummary, Latitude, Longitude


def calculate_centroid(points: list[GeoPoint]) -> GeoCentroid:
    return GeoCentroid(
        lat=Latitude(sum(p.lat for p in points) / len(points)),
        lng=Longitude(sum(p.lng for p in points) / len(points)),
    )


def calculate_bounds(points: list[GeoPoint]) -> GeoBounds:
    return GeoBounds(
        north=max(p.lat for p in points),
        south=min(p.lat for p in points),
        east=max(p.lng for p in points),
        west=min(p.lng for p in points),
    )


def compute_summary(points: list[GeoPoint]) -> GeoSummary:
    return GeoSummary(
        centroid=calculate_centroid(points), bounds=calculate_bounds(points)
    )
