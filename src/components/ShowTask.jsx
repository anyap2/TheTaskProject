import { useContext } from "react"
import { Storage } from "../App.js";
import TaskList from "./TaskList"

export default function ShowTask() {

    const { setShowTaskWindow,showTaskWindow, taskIndex } = useContext(Storage)
    console.log(showTaskWindow)
    console.log(taskIndex)
    
    return (

        <div>
            {showTaskWindow && taskIndex && showTaskWindow === taskIndex ?
                <div id='halfWhiteDiv'>
                    <div id="editBoardDiv">
                        <TaskList />
                    </div>
                </div>
                    : <></>}
        </div>

    )
}
