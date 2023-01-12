import { useContext, useState } from "react";
import { db } from "../Firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import BoardsList from "./BoardsList.jsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Storage } from "../App.js";


export default function BoardsPage() {

  const boardsCollectionRef = collection(db, "boards");

  const { boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
    setNewBoardTitle, selectedColor, setSelectedColor
  } = useContext(Storage)

  const createBoard = () => {
    try {
      const doc_Data = {
        Title: newBoardTitle,
        Color: newBoardColor,
      }
      setBoardsList([...boardsList, doc_Data])

      addDoc(boardsCollectionRef, doc_Data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='lg'>Your boards</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Label>Name your board</Form.Label>

          <Form.Control type="text" placeholder="Title..."
            onChange={(event) => { setNewBoardTitle(event.target.value) }} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">

          <Form.Label>Chose your mood</Form.Label>

          <Form.Select aria-label="Floating label select example"
            onChange={(event) => { setNewBoardColor(event.target.value) }}>

            <option>Choose your colour</option>
            <option value='info'>info</option>
            <option value='warning'>warning</option>
            <option value='success'>success</option>
            <option value='danger'>danger</option>
            <option value='primary'>primary</option>
            <option value='light'>light</option>
            <option value='dark'>dark</option>
          </Form.Select>

        </Form.Group>

        <Button variant="primary" type="button" onClick={() => createBoard()}>
          Create board
        </Button>

      </Form>

      <BoardsList />
      {console.log(4)}

    </div>
  );
}
