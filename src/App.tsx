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
import useLocalStorage from "./hooks/use-local-storage";
import useTaskStore from "./hooks/use-task-store";
import TaskContext from "./contexts/task-store";


function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks',[]);

  
  

  return (
    <BrowserRouter> 
       <TaskContext.Provider value={[tasks, setTasks]}>
      <nav>
        <NavLink to="/">List</NavLink>
        {' '}-{' '}
        <NavLink to="/focus">Focus</NavLink>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<ListScreen/>}></Route>
        <Route path="/focus" element={<FocusScreen/>}></Route>
      </Routes>

      </TaskContext.Provider>
    </BrowserRouter>



  );
}

export default App;
