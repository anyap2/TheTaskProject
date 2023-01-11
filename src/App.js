import BoardsPage from "./BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, react } from "react";
import Context from './Context'

export const Storage = createContext()

function App() {
  
const values = Context()
  return (
    <Storage.Provider value={values}>
      <div className="">
        <BoardsPage />
      </div>
    </Storage.Provider>
  );
}

export default App;
