import { db } from "../Firebase-config.js";
import { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Storage } from "../App.js";
function TaskList() {
    const [tasksArray, setTasksArray] = useState()
    const [inputValue, setInputValue] = useState()

    const { boardsList, editIndex
    } = useContext(Storage)
    console.log(editIndex)
    const board = boardsList[editIndex]
    const boardRef = doc(db, "boards", board?.id)
    const asyncFunc = async () => {
        // Atomically add a new region to the "regions" array field.
        await updateDoc(boardRef, {
            tasksList: arrayUnion(inputValue)
        });

        // Atomically remove a region from the "tasksList" array field.
        // await updateDoc(boardRef, {
        //     tasksList: arrayRemove("east_coast")
        // });
    }

    return (<div>
        <input type="text" onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => asyncFunc()}></button>
    </div>
    )
}
export default TaskList;