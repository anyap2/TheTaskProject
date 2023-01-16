import { useContext } from "react"
import { Storage } from "../App.js";
import TaskList from "./TaskList"

export default function ShowTask() {

    const { setShowTaskWindow, showTaskWindow, taskIndex, boardIndex } = useContext(Storage)
    console.log(showTaskWindow)
    console.log(boardIndex)

    return (

        <div>
            {/* {showTaskWindow && showTaskWindow === boardIndex ?
                <TaskList />
                : <></>} */}
        </div>

    )
}
