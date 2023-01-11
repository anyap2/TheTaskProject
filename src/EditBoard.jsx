import { db } from "./Firebase-config.js";
// import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EditBoard(props) {

  const [editBoardTitle, setEditBoardTitle] = useState(props.board.Title)
  const [editBoardColor, setEditBoardColor] = useState(props.board.Color)

  const updateTitle = async () => {
    props.setShowEditWindow(false);
    const boardRef = doc(db, "boards", props.board.id)
    const updeteTitle = { Title: editBoardTitle }
    await updateDoc(boardRef, updeteTitle);
    // window.location.reload(false);

  }

  const updateColor = async () => {
    const boardRef = doc(db, "boards", props.board.id)
    const updeteColor = { Color: editBoardColor }
    await updateDoc(boardRef, updeteColor);
    window.location.reload(true);
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
        onClick={() => { updateTitle(); updateColor() }}>
        Create board
      </Button>

    </Form>

  );
}
