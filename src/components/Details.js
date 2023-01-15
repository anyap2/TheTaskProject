import { useState, useEffect } from "react";
import { db } from '../Firebase-config'
import { collection, deleteDoc, getDocs, doc, addDoc } from "firebase/firestore";
import "../details.css"
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     ArcElement,
//     Tooltip,
//     Legend
// } from 'chart.js'

// import{Doughnut} from 'react-chartjs-2'

// ChartJS.register( CategoryScale,
//     LinearScale,
//     ArcElement,
//     Tooltip,
//     Legend);


function Details() {
    const [chartData,setChartData]=useState({
        datasets:[]
    })
    const[chartOptions,setChartOprions]=useState({})
    // useEffect (()=> {
    //     labels: ['yes','no'],
    //     datasets: [{
    //     label:'Poll', 
    //     data:[3,6] ,
    //      backgroundColor:['black','red'] ,
    //      borderColor:['black','red']
    // })
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask]=useState()
    const ListCollectionRef = collection(db, "shopping-list",)
    // const data={
    //     labels: ['yes','no'],
    //     datasets: [{
    //     label:'Poll', 
    //     data:[3,6] ,
    //      backgroundColor:['black','red'] ,
    //      borderColor:['black','red']
    //     }]
    // }
    // const options= {

    // }
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
                <h1>Shopping List Details</h1>
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
            <div className="ChartDoghnut">
            {/* <Doughnut data={data} options={options}>

            </Doughnut> */}
            </div>
        </div>
    );
}
export default Details;

