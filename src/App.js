<<<<<<< HEAD
=======
import BoardsPage from "./BoardsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, react } from "react";
import Context from './Context'

export const Storage = createContext()

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
