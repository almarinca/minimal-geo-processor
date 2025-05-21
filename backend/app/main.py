from fastapi import FastAPI

from .schemas import GeoData, GeoSummary
from .geoservice import compute_summary


app = FastAPI()


@app.post("/geo/summary")
def get_coordinates_summary(geo_data: GeoData) -> GeoSummary:
    return compute_summary(geo_data.points)
