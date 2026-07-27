from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.routers.task_router import router as task_router
from app.models.task import Task

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")

app.include_router(task_router)

@app.get("/")
def home():
    return {
        "message": "Todo API is Running"
    }