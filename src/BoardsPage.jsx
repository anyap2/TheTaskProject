import { useState } from "react";
import { db } from "./Firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import BoardsList from "./BoardsList.jsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BoardsPage() {
  const boardsCollectionRef = collection(db, "boards");

  const [boardsList, setBoardsList] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardColor, setNewBoardColor] = useState();

  const createBoard = async () => {
    console.log({
      Title: newBoardTitle,
      Color: newBoardColor,
    });
    try {
      const newDoc=await addDoc(boardsCollectionRef, {
        Title: newBoardTitle,
        Color: newBoardColor,
      });
      console.log(newDoc?.id);
      // get the single doc

      // add the new doc to the boardLisrts array
      // setBoardsList([...BoardsList,  newboarddddd])
    } catch (error) {
      console.log(error);
    }
    // console.log(newDoc);

    // window.location.reload(false);
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
            onChange={(event) => { setNewBoardColor(event.target.value) }}
          >
            <option>Choose your colour</option>
            <option value='primary' >primary</option>
            <option value='secondary' >secondary</option>
            <option value='success' >success</option>
            <option value='danger' >danger</option>
            <option value='warning' >warning</option>
            <option value='info' >info</option>
            <option value='light' >light</option>
            <option value='dark' >dark</option>
          </Form.Select>

        </Form.Group>

        <Button variant="primary" type="button" onClick={createBoard}>
          Create board
        </Button>

      </Form>
      <BoardsList boardsList={boardsList} setBoardsList={setBoardsList} />

    </div>
  );
}
