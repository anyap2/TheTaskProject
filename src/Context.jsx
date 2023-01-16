import { useState } from "react";

export default function Context() {

    const [boardsList, setBoardsList] = useState([]);
    const [newBoardTitle, setNewBoardTitle] = useState("");
    const [newBoardColor, setNewBoardColor] = useState('');
    const [showEditWindow, setShowEditWindow] = useState(false)
    const [editBoardTitle, setEditBoardTitle] = useState('')
    const [editBoardColor, setEditBoardColor] = useState('')
    const [selectedColor, setSelectedColor] = useState()
    const [backGround, setBackGround] = useState()
    const [editIndex, setEditIndex] = useState()
    const [boardDetails, setBoardDetails] = useState()
    const [boardIndex, setBoardIndex] = useState()
    const [boardId, setBoardId] = useState('')
    const [tasksList, setTasksList] = useState()
    const [newTask, setNewTask] = useState()

    return {
        boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
        setNewBoardTitle, editBoardTitle, setEditBoardTitle, editBoardColor, setEditBoardColor,
        showEditWindow, setShowEditWindow, backGround, setBackGround, selectedColor,
        setSelectedColor, editIndex, setEditIndex, boardDetails, setBoardDetails, boardIndex,
        setBoardIndex, boardId, setBoardId, tasksList, setTasksList, newTask, setNewTask,

    }
}