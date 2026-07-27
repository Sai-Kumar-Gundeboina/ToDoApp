from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.services.task_service import TaskService
from app.exceptions.task_exception import TaskNotFoundException

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.post("/", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    service = TaskService(db)
    return service.create_task(task)

@router.get("/", response_model=list[TaskResponse])
def get_all_tasks(
    db: Session = Depends(get_db)
):
    service = TaskService(db)
    return service.get_all_tasks()

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    service = TaskService(db)
    try:

        return service.get_task_by_id(task_id)
    except TaskNotFoundException as ex:
        raise HTTPException(
            status_code=404,
            detail=str(ex)
        )
@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db)
):
    service = TaskService(db)
    return service.update_task(task_id, task)

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    service = TaskService(db)

    service.delete_task(task_id)

    return {
        "message": "Task deleted successfully"
    }