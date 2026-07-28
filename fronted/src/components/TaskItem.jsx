import React from 'react'

export default function TaskItem({task, index, onDeleteTask, onToggleCompleted, onEditTask}) {
  return (
    <div className='task-card'>
        <div className='task-info'>
            <h3 style={{textDecoration: task.status
                        ? "line-through"
                        : "none",
                }}>{task.task_name}</h3>
        <p>📅 Deadline: {task.deadline} </p>
        </div>
        <div className='task-actions'>
            <label className='checkbox'>
                <input
                    type='checkbox'
                    checked = {task.status}
                    onChange= {()=>onToggleCompleted(index)}
                />
                Completed
            </label>
            <br/><br/>
            <button onClick={()=> onDeleteTask(index)}>
                🗑 Delete
            </button>
            <button onClick={()=> onEditTask(index)}>
                ✏️ Edit
            </button>
        </div> 
    </div>
  )
}
