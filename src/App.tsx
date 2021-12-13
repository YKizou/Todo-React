import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ListScreen from "./screens/ListScreen";

import { ReactDOM, useState} from "react";
import { NavLink } from "react-router-dom";
import FocusScreen from "./screens/FocusScreen";
import { Task, tasksApi } from "./types"


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const updateTaskCompletion = (taskId: string, isComplete:boolean) =>  {
    setTasks(tasks=>tasks.map(task=>{
        if(task.id === taskId) return {...task, isComplete};
        return task;
    }));
    console.log(taskId, isComplete)
};


  const tasksApi = {tasks, setTasks, updateTaskCompletion}; 

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
