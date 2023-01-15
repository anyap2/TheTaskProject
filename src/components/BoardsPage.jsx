import { useContext, useState } from "react";
import { db } from "../Firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import BoardsList from "./BoardsList.jsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Storage } from "../App.js";
import { async } from "q";
import { useForm } from "react-hook-form";



export default function BoardsPage() {

  const boardsCollectionRef = collection(db, "boards");

  const { boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
    setNewBoardTitle } = useContext(Storage)

  const { handleSubmit, reset, register, } = useForm()

  const onSubmit = (data) => {

    setNewBoardTitle(data.Title)
    setNewBoardColor(data.Color)

    const doc_Data = {
      Title: data.Title,
      Color: data.Color,
    };
    // console.log({
    //   Title: newBoardTitle,
    //   Color: newBoardColor,
    // })
    console.log(doc_Data);
    addDoc(boardsCollectionRef, doc_Data);

    setBoardsList([...boardsList, data]);

    reset()
  };

  return (
    <div>
      <h1 className='lg'>Your boards</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Label>Name your board</Form.Label>

          <Form.Control type="text" placeholder="Title..."
            {...register("Title",)}
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">

          <Form.Label>Chose your mood</Form.Label>

          <Form.Select aria-label="Floating label select example"
            {...register("Color",)}
          >

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

        <Button variant="primary" type="submit" >
          Create board
        </Button>

      </Form>

      <BoardsList />

    </div>
  );
}
