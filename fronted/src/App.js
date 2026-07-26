import './App.css';
import RegisterTask from './components/RegisterTask';
import { useState } from 'react';
import TaskList from './components/TaskList';

function App() {
  const[tasks, setTasks] = useState([]);
  const[editIndex, setEditIndex] = useState(-1);
  const[editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const handleAddTask= (task)=>{
    setTasks([...tasks, task]);
  }
  const handleUpdateTask = (updatedTask)=>{
    const updatedTasks = tasks.map((task, index)=>
    index === editIndex ? updatedTask : task);
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditTask(null);
  }
  const handleDelete = (index) =>{
    const updatedTasks = tasks.filter((_, i) => i!== index);
    setTasks(updatedTasks);
  };
  const handleToggleCompleted = (index) =>{
    const updatedTasks = tasks.map((task, i)=>{
      if (i===index){
        return {
          ...task,
          completed: !task.completed,
        }
      }
      return task;
    })
    setTasks(updatedTasks);
  }
  const handleEditTask = (index) =>{
    setEditIndex(index);
    setEditTask(tasks[index]);
    
  }
  const handleResetForm = ()=>{
    if(editTask)
    {
      setEditIndex(-1);
      setEditTask(null);
    }
  }
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    task => task.completed
  ).length;
  const pendingTasks = tasks.filter(
    task => !task.completed
  ).length;
  const filteredTasks = tasks.filter(task =>{
    if (filter === "COMPLETED")
      return task.completed;
    if (filter === "PENDING")
      return !task.completed;
    return true;
  })
  return (
    <div className='app'>
      <h1>TO-DO List</h1>
      <RegisterTask 
        onAddTask={handleAddTask} 
        onUpdateTask={handleUpdateTask} 
        editTask = {editTask}
        onResetForm = {handleResetForm}/>
      <hr/>
      <TaskList 
        tasks={filteredTasks} 
        onDeleteTask = {handleDelete} 
        onToggleCompleted = {handleToggleCompleted} 
        onEditTask = {handleEditTask}
        totalTasks = {totalTasks}
        completedTasks = {completedTasks}
        pendingTasks = {pendingTasks}
        setFilter = {setFilter}
        filter = {filter}/>
      
    </div>
  );
}

export default App;
