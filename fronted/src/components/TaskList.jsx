import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({tasks, onDeleteTask, onToggleCompleted, onEditTask, totalTasks, pendingTasks, completedTasks, setFilter, filter}) {
  return (
    <div >
        <h2>Task List</h2>
        <div className='dashboard'>
            <div className='card'>
                <p>Total Tasks : {totalTasks}</p>
            </div>
            <div className='card'>
                <p>Completed Tasks : {completedTasks}</p>
            </div>
            <div className='card'>
                <p>Pending Tasks : {pendingTasks}</p>
            </div>
        </div>
                
        <div className='filter-buttons'>
            <button className = {filter === "ALL" ? "active" : ""} onClick={()=> setFilter("ALL")}>ALL</button>
            <button className = {filter === "COMPLETED" ? "active" : ""} onClick={ ()=> setFilter("COMPLETED")}>COMPLETED</button>
            <button className = {filter === "PENDING" ? "active" : ""} onClick={()=> setFilter("PENDING")}>PENDING</button>
        </div>
        { tasks.length === 0 ?(
            <p>No Tasks Available</p>
        ) : (
            tasks.map((task)=>(
                <TaskItem 
                    key= {task.id} 
                    task = {task} 
                    index = {task.id} 
                    onDeleteTask = {onDeleteTask}
                    onToggleCompleted = {onToggleCompleted}
                    onEditTask = {onEditTask}
                />
            )))}
    </div>
  )
}
