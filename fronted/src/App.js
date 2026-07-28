import './App.css';
import RegisterTask from './components/RegisterTask';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { getTasks, createTask, deleteTask, updateTask } from './taskservice';

function App() {
  const[tasks, setTasks] = useState([]);
  const[editIndex, setEditIndex] = useState(-1);
  const[editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("ALL");

  // const handleAddTask= (task)=>{
  //   setTasks([...tasks, task]);
  // }
  const handleAddTask = async (task) => {
    try {
        await createTask(task);
        loadTasks();
    } catch (error) {
        console.error(error);
    }
};

  const loadTasks = async () => {
    try {
        const response = await getTasks();
        setTasks(response.data);
    } catch (error) {
        console.error(error);
    }
  };

  // const handleUpdateTask = (updatedTask)=>{
  //   const updatedTasks = tasks.map((task, index)=>
  //   index === editIndex ? updatedTask : task);
  //   setTasks(updatedTasks);
  //   setEditIndex(-1);
  //   setEditTask(null);
  // }
  
  const handleUpdateTask = async(updatedTask) =>{
    try{
      await updateTask(editIndex, updatedTask);
      loadTasks();
    }catch(error){
      console.log(error);
    }
  }
  // const handleDelete = (index) =>{
  //   const updatedTasks = tasks.filter((_, i) => i!== index);
  //   setTasks(updatedTasks);
  // };
  const handleDelete = async (index)=>{
    try{
        await deleteTask(index);
        loadTasks();
    }catch(error){
      console.log(error);
    }
  }

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

  useEffect(() => {
    loadTasks();
}, []);

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
