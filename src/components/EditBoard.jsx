import { db } from "../Firebase-config.js";
import { useState, useEffect, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Storage } from "../App.js";
import './editForm.css'
import Modal from 'react-bootstrap/Modal';


export default function EditBoard() {
  const { boardsList, setBoardsList, setShowEditWindow, editBoardTitle, editBoardColor,
    setEditBoardColor, setEditBoardTitle, editIndex, setEditIndex
  } = useContext(Storage)

  const board = boardsList[editIndex]

  // useEffect(() => {
  //   setEditBoardColor(board.color)
  //   setEditBoardTitle(board.title)
  // }, [])

  const updateBoard = async () => {

    const boardRef = doc(db, "boards", board?.id)
    console.log(board)
    await updateDoc(boardRef, { Color: editBoardColor, Title: editBoardTitle });

    const temp = boardsList;
    temp[editIndex].Title = editBoardTitle
    temp[editIndex].Color = editBoardColor
    setBoardsList([...temp])
    setShowEditWindow(false);
  }


  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>

      <Modal.Dialog>

        <Modal.Header closeButton onClick={() => setShowEditWindow("")}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Change your boards name</Form.Label>
            <Form.Control type="text" placeholder="Title..."
              defaultValue={board.Title}
              onChange={(e) => setEditBoardTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Change your mood</Form.Label>
            <Form.Select aria-label="Floating label select example"
              defaultValue={board.Color}
              onChange={(e) => setEditBoardColor(e.target.value)}>
              <option>Choose your colour</option>
              <option value='primary' >primary</option>
              <option value='success' >success</option>
              <option value='danger' >danger</option>
              <option value='warning' >warning</option>
              <option value='info' >info</option>
              <option value='light' >light</option>
              <option value='dark' >dark</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary"
            onClick={() => setShowEditWindow("")}>
            Close
          </Button>

          <Button variant="primary" type="button"
            onClick={() => { updateBoard(); setShowEditWindow("") }}>
            Save the changes
          </Button>

        </Modal.Footer>

      </Modal.Dialog>
    </div>

  );
}
