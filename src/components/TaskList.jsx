import { db } from "../Firebase-config.js";
import { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Storage } from "../App.js";
import "./details.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function TaskList() {


    const { boardsList, editIndex, boardId, tasksList, setTasksList, setTaskIndex } = useContext(Storage)

    const board = boardsList[editIndex]
    const boardRef = doc(db, "boards", boardId)
    console.log(boardId)


    return (
        <div className="DetailsBody">
            {tasksList.map((item, index) =>
                <Form key={index} onClick={() => setTaskIndex(index)} >
                    <Form.Group name="packersOff" id={index} defaultValue="1"
                        className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label lassName="strikethrough" htmlFor={index}>{item.name}
                            ({item.quantity})</Form.Label>
                        <p>{item}</p>
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="button"
                    // onClick={() => deleteTask(item?.id)}
                    >
                        Delete
                    </Button>
                </Form>)
            }
        </div >
    )
}