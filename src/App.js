import ThemeProvider from 'react-bootstrap/ThemeProvider'
import BoardsPage from "./components/BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useContext } from "react";
import Context from './Context'
import Task from './components/Task'
import Details from './components/Details'
import TaskList from './components/TaskList';
import { Route, Routes, NavLink, } from 'react-router-dom';
import './app.css'
import ShowTask from './components/ShowTask';
export const Storage = createContext()


function App() {


  const values = Context()
  return (
    <ThemeProvider breakpoints={[
      'xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <Storage.Provider value={values}>
        <div className="all">

          <div className='forms'>
            <BoardsPage />
            <Task />
          </div>
          <ShowTask />

          <Routes>
            <Route path="/Details" element={<Details />}> </Route>
            <Route path="/components/Task" element={<Task />}> </Route>
          </Routes>
        </div>
      </Storage.Provider>
    </ThemeProvider>

  );
}

export default App;
