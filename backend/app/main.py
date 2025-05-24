from fastapi import FastAPI

from . import georouter


app = FastAPI()
app.include_router(georouter.router)
