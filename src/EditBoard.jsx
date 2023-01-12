import { db } from "./Firebase-config.js";
import { useState, useEffect, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Storage } from "./App.js";


export default function EditBoard({data}) {

  useEffect(()=>{
    setEditBoardColor(data.Color)
    setEditBoardTitle(data.Title)
  },[])

  const { boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
    setNewBoardTitle, showEditWindow, setShowEditWindow, editBoardTitle, editBoardColor,
    setEditBoardColor, setEditBoardTitle, mapBoard
  } = useContext(Storage)


  const updateBoard = () => {
    try {
      
      const boardRef = doc(db, "boards", data.id)
      updateDoc(boardRef, { Title: editBoardTitle });
      updateDoc(boardRef, { Color: editBoardColor });
      
      setShowEditWindow(false);
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <Form>

      <Form.Group className="mb-3" controlId="formBasicEmail">

        <Form.Label>Name your board</Form.Label>

        <Form.Control type="text" placeholder="Title..."
          value={editBoardTitle}
          onChange={(e) => setEditBoardTitle(e.target.value)} />

      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">

        <Form.Label>Change your mood</Form.Label>

        <Form.Select aria-label="Floating label select example"
          value={editBoardColor}
          onChange={(e) => setEditBoardColor(e.target.value)}>

          <option>Choose your colour</option>
          <option value='primary' >primary</option>
          <option value='secondary' >secondary</option>
          <option value='success' >success</option>
          <option value='danger' >danger</option>
          <option value='warning' >warning</option>
          <option value='info' >info</option>
          <option value='light' >Thlightree</option>
          <option value='dark' >dark</option>

        </Form.Select>

      </Form.Group>


      <Button variant="primary" type="button"
        onClick={() => { updateBoard() }}>
        Save the changes
      </Button>
{console.log(6)}
    </Form>

  );
}
