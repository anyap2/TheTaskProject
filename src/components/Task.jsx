import { db } from "../Firebase-config.js";
import { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Storage } from "../App.js";
import './editForm.css'
export default function Task() {
    const { boardsList, boardIndex,boardId
    } = useContext(Storage)
    console.log(boardId)

    const [inputValue, setInputValue] = useState()
    const [tasksArray, setTasksArray] = useState()
    
    const handleChange = (e) => {
        setInputValue(e.target.value)
        const tempArray = tasksArray && [...tasksArray, e.target.value]
        setTasksArray(tempArray)
    }
    const board = boardsList[boardIndex]
    
    const asyncFunc = async () => {
       
        const boardRef = doc(db, "boards", boardId)
        await updateDoc(boardRef, {
            tasksList: arrayUnion(inputValue)
        });

    }


    return (
        <div>
            <input type="text" onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => asyncFunc()}></button>
        </div>
    )
}