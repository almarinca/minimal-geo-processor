from .schemas import GeoBounds, GeoCentroid, GeoPoint, GeoSummary, Latitude, Longitude


def calculate_centroid(points: list[GeoPoint]) -> GeoCentroid:
    """
    Calculate the geographic centroid from a list of GeoPoint objects representing coordinates.

    The centroid is computed by averaging the latitudes and longitudes
    of all points in the list.

    Args:
        points (list[GeoPoint]): A list of geographic points.

    Returns:
        GeoCentroid: An object representing the geographic centroid.
    """
    return GeoCentroid(
        lat=Latitude(sum(p.lat for p in points) / len(points)),
        lng=Longitude(sum(p.lng for p in points) / len(points)),
    )


def calculate_bounds(points: list[GeoPoint]) -> GeoBounds:
    """
    Calculate the geographic bounding box from a list of GeoPoint objects representing coordinates.

    The bounds include:
        - North: the maximum latitude (northernmost point)
        - South: the minimum latitude (southernmost point)
        - East: the maximum longitude (easternmost point)
        - West: the minimum longitude (westernmost point)

    Args:
        points (list[GeoPoint]): A list of geographic points.

    Returns:
        GeoBounds: An object representing the bounding box with north, south, east, and west limits.
    """
    return GeoBounds(
        north=max(p.lat for p in points),
        south=min(p.lat for p in points),
        east=max(p.lng for p in points),
        west=min(p.lng for p in points),
    )


def compute_summary(points: list[GeoPoint]) -> GeoSummary:
    """
    Compute a geographic summary from a list of GeoPoint objects  representing coordinates.

    The summary includes:
        - The centroid (average latitude and longitude)
        - The bounding box (north, south, east, west extents)

    Args:
        points (list[GeoPoint]): A list of geographic points.

    Returns:
        GeoSummary: An object containing both the centroid and the bounds of the points.
    """
    return GeoSummary(
        centroid=calculate_centroid(points), bounds=calculate_bounds(points)
    )
