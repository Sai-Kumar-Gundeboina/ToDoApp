from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_task(self, task: TaskCreate):

        db_task = Task(
            task_name=task.task_name,
            description=task.description,
            deadline=task.deadline
        )

        self.db.add(db_task)
        self.db.commit()
        self.db.refresh(db_task)

        return db_task

    def get_all_tasks(self):

        return self.db.query(Task).all()

    def get_task_by_id(self, task_id: int):

        return (
            self.db.query(Task)
            .filter(Task.id == task_id)
            .first()
        )
    def update_task(self, task_id: int, task: TaskUpdate):

        db_task = self.get_task_by_id(task_id)

        if not db_task:
            return None

        db_task.task_name = task.task_name
        db_task.description = task.description
        db_task.deadline = task.deadline
        db_task.status = task.status

        self.db.commit()
        self.db.refresh(db_task)

        return db_task

    def delete_task(self, task_id: int):

        db_task = self.get_task_by_id(task_id)

        if not db_task:
            return None

        self.db.delete(db_task)
        self.db.commit()

        return db_task