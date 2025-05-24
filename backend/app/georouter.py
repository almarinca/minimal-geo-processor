from fastapi import APIRouter

from .schemas import GeoData, GeoSummary
from .geoservice import compute_summary


router = APIRouter()


@router.post("/geo/summary")
def get_coordinates_summary(geo_data: GeoData) -> GeoSummary:
    """
    Generate a geographic summary from a list of coordinates.

    The summary includes the centroid and the bounding box
    (north, south, east, west limits) of the provided coordinates.
    """
    return compute_summary(geo_data.points)
