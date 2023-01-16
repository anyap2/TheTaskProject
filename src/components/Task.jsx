import { db } from "../Firebase-config.js";
import { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Storage } from "../App.js";
import { useForm } from "react-hook-form";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import TaskList from "./TaskList.jsx";

export default function Task() {

    const { boardsList, boardIndex, boardId, tasksList, setTasksList, setNewTask, newTask, setBoardsList
    } = useContext(Storage)

    const { handleSubmit, reset, register, } = useForm()
    const [inputValue, setInputValue] = useState()
    const [tasksArray, setTasksArray] = useState()
    const board = boardsList[boardIndex]

    const handleChange = (e) => {
        setInputValue(e.target.value)
        const tempArray = tasksArray && [...tasksArray, e.target.value]
        setTasksArray(tempArray)
    }

    const onSubmit = async (data) => {

        const boardRef = doc(db, "boards", boardId)

        await updateDoc(boardRef, {
            tasksList: arrayUnion(newTask)
        });

        setNewTask(data)
        const tempArray = tasksList && [...tasksList, data]
        setTasksList(tempArray);

        console.log(boardId)
        setTasksList([...tasksList, data]);
        setBoardsList(boardsList)
        reset()
    };

    return (
        <div id="createTaskDiv">
            <Card border="secondary" style={{ width: '18rem' }}>
                <Card.Body>
                    <Form id="" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='lg'>Create task</h1>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Title</Form.Label>
                            <Form.Control type="text" placeholder="Title..."
                                {...register("Title",)}
                                onChange={(e) => setNewTask(e.target.value)} />
                        </Form.Group>

                        <Button variant="outline-info" type="submit" >
                            Create task
                        </Button>

                    </Form>

                </Card.Body>
            </Card>
        </div>
    )
}