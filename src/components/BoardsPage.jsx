import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../Firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import BoardsList from "./BoardsList.jsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Storage } from "../App.js";
import EditBoard from "./EditBoard";
import './boardsPage.css'
import Card from 'react-bootstrap/Card';



export default function BoardsPage() {

  const boardsCollectionRef = collection(db, "boards");

  const { boardsList, setBoardsList, setNewBoardColor, setNewBoardTitle,
  showEditWindow, setShowEditWindow, editIndex,editBord } = useContext(Storage)

  const { handleSubmit, reset, register, } = useForm()

  const onSubmit = (data) => {
    setNewBoardTitle(data.Title)
    setNewBoardColor(data.Color)
    setBoardsList([...boardsList, data]);
    const doc_Data = {
      Title: data.Title,
      Color: data.Color,
      tasksList: []
    };
    addDoc(boardsCollectionRef, doc_Data);
    reset()
  };
  return (
    <div id="createBoardDiv">
      {
        showEditWindow === editIndex ?
          <div id='halfWhiteDiv'>
            <div id="editBoardDiv">
              <EditBoard />
              </div>
            
          </div>

          : <></>
      }
      <br />
      <Card border="secondary" style={{ width: '18rem' }}
        id="createCard">
        <Card.Body>
          <Form id="createBoardDiv" onSubmit={handleSubmit(onSubmit)}>
            <h1 className='lg'>Create board</h1>

            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Label >Name your board</Form.Label>

              <Form.Control type="text" placeholder="Title..."
                {...register("Title",)}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="foFrmBasicPassword">

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

            <Button variant="outline-info" type="submit" >
              Create board
            </Button>

          </Form>

        </Card.Body>
      </Card>
      <br />

      <BoardsList />
    </div>
  );
}
