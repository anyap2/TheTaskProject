import React, { useState } from "react";
import Task from "./components/Task";
import BoardsPage from "./components/BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, react } from "react";
import Context from './Context'
import Details from "./components/Details";
import DetailsChart from "./components/DetailsChart";
export const Storage = createContext()


function App() {

  const values = Context()
  const [userData,setUserData]=useState()
  return (
    <Storage.Provider value={values}>
      <div className="App">
        <Details></Details>
        <DetailsChart />
        <Task></Task>
        <BoardsPage />
      </div>
    </Storage.Provider>
  );
}

export default App;
