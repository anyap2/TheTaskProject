<<<<<<< HEAD
=======
import BoardsPage from "./BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, react } from "react";
import Context from './Context'
import React from "react";
import Task from "./components/Task";
export const Storage = createContext()
import React from "react";
import Task from "./components/Task";

>>>>>>> master

  import Details from "./Details";
function App() {
  
const values = Context()

  return (
<<<<<<< HEAD
    <div className="App">
      
      <Details></Details>
    </div>
=======
    <Storage.Provider value={values}>
      <div className="">
        <BoardsPage />
      </div>
    </Storage.Provider>
>>>>>>> master
  );
}

export default App;
