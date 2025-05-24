from pydantic import BaseModel, field_validator
from pydantic_extra_types.coordinate import Latitude, Longitude


class RoundCoordinatesMixin(BaseModel):
    """
    Mixin class for rounding coordinate values to four decimal places.
    """

    @field_validator("lat", "lng", "north", "south", "east", "west", check_fields=False)
    @classmethod
    def round_to_4_decimal_places(cls, v: float) -> float:
        return round(v, 4)


class GeoPoint(RoundCoordinatesMixin):
    """
    Model representing a geographic point with latitude and longitude.

    Attributes:
        lat (Latitude): The latitude of the point.
        lng (Longitude): The longitude of the point.
    """

    lat: Latitude
    lng: Longitude


class GeoCentroid(GeoPoint):
    """
    Model representing the centroid of multiple geographic points.

    Inherits from GeoPoint and has the same attributes:
        - lat: Latitude of the centroid
        - lng: Longitude of the centroid
    """

    pass


class GeoData(BaseModel):
    """
    Input model containing a list of geographic points.

    Attributes:
        points (list[GeoPoint]): A list of GeoPoint objects.
    """

    points: list[GeoPoint]


class GeoBounds(RoundCoordinatesMixin):
    """
    Model representing a geographic bounding box.

    Attributes:
        north (Latitude): Northernmost latitude.
        south (Latitude): Southernmost latitude.
        east (Longitude): Easternmost longitude.
        west (Longitude): Westernmost longitude.
    """

    north: Latitude
    south: Latitude
    east: Longitude
    west: Longitude


class GeoSummary(BaseModel):
    """
    Model summarizing geographic data including the centroid and bounds.

    Attributes:
        centroid (GeoCentroid): The centroid of all given points.
        bounds (GeoBounds): The bounding box of all given points.
    """

    centroid: GeoCentroid
    bounds: GeoBounds
