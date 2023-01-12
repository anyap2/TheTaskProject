import BoardsPage from "./BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from "react";
import Context from './Context'
import Task from "./components/Task";
import Details from "./Details";
import { Route, Routes, NavLink, } from 'react-router-dom';

export const Storage = createContext()
function App() {

  const values = Context()

  return (
    <Storage.Provider value={values}>
      <div className="App">
        <BoardsPage />
        
        
        <Routes>
          <Route path="/Details" element={<Details/>}> </Route>
          <Route path="/components/Task" element={<Task/>}> </Route>
        </Routes>
      </div>
    </Storage.Provider>
  );
}

export default App;
