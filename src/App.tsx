import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListScreen from "./screens/ListScreen";
import { NavLink } from "react-router-dom";
import FocusScreen from "./screens/FocusScreen";
import { Task } from "./types";
import useLocalStorage from "./hooks/use-local-storage";
import TaskContext from "./contexts/task-store";
import styled from "styled-components";
import { colors, GlobalStyle } from "./styles";

const Layout = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 35px;
`;

const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;

const TabButton = styled(NavLink)`
  width: 120px;
  height: 62px;
  color: #fff;
  border: solid 0.3em;
  border-color: #d9e577;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  &.active {
    background: ${colors.yellow_todo};
    color: #000;
  }
`;

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={"/"}>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <Layout>
            <Nav>
              <TabButton to="/">
                <code>List</code>
              </TabButton>
              <TabButton to="/focus">
                <code>Focus</code>
              </TabButton>
            </Nav>
            <br />

            <Routes>
              <Route path="/" element={<ListScreen />}></Route>
              <Route path="/focus" element={<FocusScreen />}></Route>
            </Routes>
          </Layout>
        </TaskContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
