import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ListScreen from "./screens/ListScreen";

import { ReactDOM } from "react";
import { NavLink } from "react-router-dom";
import FocusScreen from "./screens/FocusScreen";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>



  );
}

export default App;
