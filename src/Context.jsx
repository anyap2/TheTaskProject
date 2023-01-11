import { useState } from "react";

export default function Context() {

    const [boardsList, setBoardsList] = useState([]);
    const [newBoardTitle, setNewBoardTitle] = useState("");
    const [newBoardColor, setNewBoardColor] = useState('');
    const [showEditWindow, setShowEditWindow] = useState(false)
    const [editBoardTitle, setEditBoardTitle] = useState('')
    const [editBoardColor, setEditBoardColor] = useState('')
    const [mapBoard, setMapBoard]= useState('')

    return {
        boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
        setNewBoardTitle, editBoardTitle, setEditBoardTitle, editBoardColor,
        setEditBoardColor, mapBoard, setMapBoard, showEditWindow,
        setShowEditWindow
    }
}