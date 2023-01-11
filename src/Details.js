import { useState } from "react";
import { useEffect } from "react";
import { db } from './Firebase-config'
import { collection, deleteDoc, getDocs, doc, addDoc } from "firebase/firestore";
import "./details.css"
function Details() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask]=useState()
    const ListCollectionRef = collection(db, "shopping-list",)
    useEffect(() => {
        const getTasks = async () => {
            const data = await getDocs(ListCollectionRef);
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getTasks()},[])
    const deleteTask = async (id) =>{
        console.log(id);
        const listDoc = doc(db, "shopping-list", id)
        console.log(listDoc)
        await deleteDoc(listDoc)
        window.location.reload(true);
      };
      const addTask= async()=>{
       await addDoc(ListCollectionRef, {name: newTask})
       window.location.reload(true);
      }
    return (
        <div className="DetailsMain">
            <div className="DetailsTop">
                <h1>shopping-list</h1>
            </div>
            <div className="DetailsBody">
                <ul>
                    {tasks.map((item, index) =>
                        <li key={index}>
                            <input type="checkbox" name="packersOff" id={index} value="1" />
                            <label className="strikethrough" htmlFor={index}>{item.name} ({item.quantity})</label>
                            <br/>
                            <button type="button" onClick={() => deleteTask(item?.id)}>Delete</button>
                            <br/>
                            <br/>
                        </li>)}</ul>
            </div>
            <div className="DetailsBot">
                <input onChange={(e)=>setNewTask(e.target.value)} type="text" placeholder="New task here"></input>
                <input onClick={addTask} type="Button" value={"✓"}/>
            </div>
        </div>
    );
}
export default Details;

