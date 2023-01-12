import ThemeProvider from 'react-bootstrap/ThemeProvider'
import BoardsPage from "./components/BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from "react";
import Context from './Context'
import Task from './components/Task'
import Details from './components/Details'
import { Route, Routes, NavLink, } from 'react-router-dom';

export const Storage = createContext()



function App() {

  const values = Context()

  return (
    <ThemeProvider breakpoints={[
      'xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <Storage.Provider value={values}>
        <div className="">
          <BoardsPage />
          <Task />
          <Details />
        </div>
      </Storage.Provider>
    </ThemeProvider>
    
  );
}

export default App;
