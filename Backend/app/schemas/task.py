from datetime import date
from datetime import datetime

from pydantic import BaseModel


class TaskCreate(BaseModel):
    task_name: str
    description: str | None = None
    deadline: date


class TaskUpdate(BaseModel):
    task_name: str
    description: str | None = None
    deadline: date
    status: bool


class TaskResponse(BaseModel):
    id: int
    task_name: str
    description: str | None
    deadline: date
    status: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True