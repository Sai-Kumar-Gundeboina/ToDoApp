import React, { useEffect } from 'react'
import { useState } from 'react';

function RegisterTask({onAddTask, onUpdateTask, editTask, onResetForm}) {
    const[task_name, setTaskName] = useState("");
  const[deadline, setDeadline] = useState("");
  const handleSubmit = ()=>{
    if (task_name.trim() === "" || deadline === "")
    {
      alert("Enter Valid Task name and deadline")
      return;
    }
    const task = {
        task_name,
        deadline,
        status: editTask ? editTask.status: false,
    }
    if (editTask)
    {
        onUpdateTask(task);
    }
    else
    {
        onAddTask(task);
    }
    setDeadline("");
    setTaskName("");
  }
  useEffect(()=>{
    if(editTask){
        setTaskName(editTask.task_name);
        setDeadline(editTask.deadline);
    }
  },[editTask])
  return (
    <div className='register-container'>
        <h2>Add Task</h2>
        {/* <label>Task Name : </label> */}
        <input 
          type='text' 
          placeholder='Task Name'
          value={task_name}
          onChange={(e)=>{setTaskName(e.target.value.toUpperCase())}}
        />
        <br/>
        <br/>
        {/* <label>Deadline : </label> */}
        <input 
          type='date' 
          value={deadline}
          onChange={(e)=>{setDeadline(e.target.value)}}
        />
      <br/>
      <br/>
      <button onClick={handleSubmit}>
        {editTask ? ("Update Task"):("Add Task")}
      </button>
      <button onClick={()=>{onResetForm();setDeadline("");setTaskName("")}}>Clear</button>
    </div>
  )
}
export default RegisterTask;