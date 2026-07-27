from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repository.task_repository import TaskRepository
from app.schemas.task import TaskCreate, TaskUpdate
from app.exceptions.task_exception import TaskNotFoundException


class TaskService:

    def __init__(self, db: Session):
        self.repository = TaskRepository(db)

    def create_task(self, task: TaskCreate):
        return self.repository.create_task(task)
    
    def get_all_tasks(self):
        return self.repository.get_all_tasks()

    def get_task_by_id(self, task_id: int):
        task = self.repository.get_task_by_id(task_id)
        if task is None:
            raise TaskNotFoundException(task_id)
        return task

    def update_task(self, task_id: int, task: TaskUpdate):
        updated_task = self.repository.update_task(task_id, task)
        if updated_task is None:
            raise TaskNotFoundException(task_id)
        return updated_task
    
    def delete_task(self, task_id: int):
        deleted_task = self.repository.delete_task(task_id)
        if deleted_task is None:
            raise TaskNotFoundException(task_id)
        return deleted_task