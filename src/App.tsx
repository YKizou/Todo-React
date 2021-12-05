import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ListScreen from "./screens/ListScreen";

import { ReactDOM } from "react";

function App() {
  return (
    <div>
      <ListScreen/>
    </div>
  );
}

export default App;
