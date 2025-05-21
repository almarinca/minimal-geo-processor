from pydantic import BaseModel, field_validator
from pydantic_extra_types.coordinate import Latitude, Longitude


class RoundCoordinatesMixin(BaseModel):
    @field_validator("lat", "lng", "north", "south", "east", "west", check_fields=False)
    @classmethod
    def round_to_4_decimal_places(cls, v: float) -> float:
        return round(v, 4)


class GeoPoint(RoundCoordinatesMixin):
    lat: Latitude
    lng: Longitude


class GeoCentroid(GeoPoint):
    pass


class GeoData(BaseModel):
    points: list[GeoPoint]


class GeoBounds(RoundCoordinatesMixin):
    north: Latitude
    south: Latitude
    east: Longitude
    west: Longitude


class GeoSummary(BaseModel):
    centroid: GeoCentroid
    bounds: GeoBounds
