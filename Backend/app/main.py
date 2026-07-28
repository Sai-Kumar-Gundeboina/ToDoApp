from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.routers.task_router import router as task_router
from app.models.task import Task
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")

app.include_router(task_router)

origins = [
    "https://upgraded-lamp-4pgpg9p5xvf755-3000.app.github.dev",
    "http://localhost:3000",
    "http://todo-react-frontend-123456.s3-website.ap-south-1.amazonaws.com/",or
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "Todo API is Running"
    }