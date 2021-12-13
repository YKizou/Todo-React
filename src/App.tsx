import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ListScreen from "./screens/ListScreen";

import { ReactDOM, useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import FocusScreen from "./screens/FocusScreen";
import { Task, tasksApi } from "./types"


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusedTask, setFocusedTask] = useState<Task>(tasks.filter( task =>  task.isComplete === false)[0]);

  const updateTaskCompletion = (taskId: string, isComplete:boolean) =>  {
    setTasks(tasks=>tasks.map(task=>{
        if(task.id === taskId) return {...task, isComplete};
        return task;
    }));
};

  const UncompletedTasks = tasks.filter( task =>  task.isComplete === false);


  const shuffleFocusedTask = () => {
    let shuffledTasks = [...UncompletedTasks];
    let currentIndex = shuffledTasks.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [shuffledTasks[currentIndex], shuffledTasks[randomIndex]] = [
        shuffledTasks[randomIndex], shuffledTasks[currentIndex]];
    }    
    return setFocusedTask(shuffledTasks[0]);
  }

  
  useEffect(() => {
    shuffleFocusedTask();
    console.log(focusedTask,tasks)

  }, [tasks, focusedTask, shuffleFocusedTask])



  const tasksApi = {tasks, setTasks, updateTaskCompletion, focusedTask, shuffleFocusedTask}; 

  return (
    <BrowserRouter> 
      <nav>
        <NavLink to="/">List</NavLink>
        {' '}-{' '}
        <NavLink to="/focus">Focus</NavLink>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<ListScreen {...tasksApi}/>}></Route>
        <Route path="/focus" element={<FocusScreen {...tasksApi}/>}></Route>
      </Routes>
    </BrowserRouter>



  );
}

export default App;
