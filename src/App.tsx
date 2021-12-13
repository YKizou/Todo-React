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
import styled from "styled-components";
import { colors, GlobalStyle } from "./styles";


const Layout = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding : 35px;


`

const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;


`


const TabButton = styled(NavLink)`
  width:120px;
  height: 62px;
  color : #fff;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  
  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &.active {
      background: ${colors.primary};
      color: #000
  }
`

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks',[]);

  
  

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={'/projects/todo'}> 
        <TaskContext.Provider value={[tasks, setTasks]}>
          <Layout>
            <Nav>
              <TabButton to="/">List</TabButton>
              <TabButton to="/focus">Focus</TabButton>
            </Nav>
            <br />

            <Routes>
              <Route path="/" element={<ListScreen/>}></Route>
              <Route path="/focus" element={<FocusScreen/>}></Route>
            </Routes>
          </Layout>
        </TaskContext.Provider>
      </BrowserRouter>
    </>



  );
}

export default App;
