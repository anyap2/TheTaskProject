import { db } from "../Firebase-config.js";
import { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Storage } from "../App.js";

function TaskList() {

    const [inputValue, setInputValue] = useState()
    const { boardsList, editIndex, boardId, tasksList, setTasksList } = useContext(Storage)
    const board = boardsList[editIndex]
    const boardRef = doc(db, "boards", boardId)


    return (
    <div>
        {}
    </div>
    )
}
export default TaskList;