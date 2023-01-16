import React from "react";
import { useState, useEffect } from "react";
import { db } from '../Firebase-config';
import { collection, getDocs, doc, addDoc, deleteDoc } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';;


function Task() {

    const location = useLocation()
    const [newToDoTask, setNewToDoTask] = useState('')
    const [newItem, setNewItem] = useState('')
    const [newQuantity, setNewQuantity] = useState(0)

    const [toDoPage, setToDoPage] = useState([])
    const [shoppingListPage, setShoppingListPage] = useState([])

    const toDoCollectionRef = collection(db, 'to-do')
    const shoppingListCollectionRef = collection(db, "shopping list"
        // location.state.listId
    )

    const addToDotask = async () => {
        await addDoc(toDoCollectionRef, { name: newToDoTask })
        // window.location.reload(true);
    }

    const addItemShopList = async () => {
        await addDoc(shoppingListCollectionRef, { name: newItem, quantity: newQuantity })
        // window.location.reload(true);
    }

    useEffect(() => {
        try {
            const getToDoPage = async () => {
                const data = await getDocs(toDoCollectionRef)
                console.log(data);
                setToDoPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            getToDoPage()
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        try {
            const getShoppingListPage = async () => {
                const data = await getDocs(shoppingListCollectionRef)
                console.log(data);
                setShoppingListPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            getShoppingListPage()
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    const deleteToDoTask = async (id) => {
        console.log(id);
        const toDoDoc = doc(db, "to-do", id)
        await deleteDoc(toDoDoc)
        window.location.reload(true);
    };


    const deleteShoppingItem = async (id) => {
        console.log(id);
        const shoppingItemDoc = doc(db, "shopping-list", id)
        await deleteDoc(shoppingItemDoc)
        window.location.reload(true);
    };

    return (
        <div>
            <Card border="secondary" style={{ width: '18rem' }}>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>
                                Your to do list

                            </Form.Label>

                            <Form.Control type="text" placeholder="new to do task..."
                                onChange={(event) => { setNewToDoTask(event.target.value) }} />

                        </Form.Group>

                        <Button variant="primary" type="button"
                            onClick={() => () => addToDotask()}>
                            Create new task
                        </Button>
                        <Button variant="primary" type="button"
                            onClick={() => () =>
                                <NavLink state={{
                                    listId: "shopping list"
                                    // location?.state?.listId
                                }} to="/Details">

                                </NavLink>}>
                            Details
                        </Button>
                    </Form>

                </Card.Body>
            </Card>

            <h2>Your tasks:</h2>
            {toDoPage.map((task, index) => {
                return <div key={index}>

                    <h3>{task.name}</h3>
                    <button type="button" onClick={() => deleteToDoTask(task?.id)}>
                        Delete task
                    </button>
                </div>
            })}
            {console.log(1)}




            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Label> Your shopping list</Form.Label>
                    <Form.Control type="text" placeholder="your item..."
                        onChange={(event) => { setNewItem(event.target.value) }} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control type="number" placeholder="how much..."
                        onChange={(event) => { setNewQuantity(event.target.value) }} />

                </Form.Group>

                <Button variant="primary" type="button"
                    onClick={() => (addItemShopList)}>
                    create new item
                </Button>
            </Form>


            <h2>Buy:</h2>
            {shoppingListPage.map((item, index) => {
                return <div key={index}>

                    <h3>{item.name} <span>({item.quantity})</span> </h3>
                    <button type="button" onClick={() => deleteShoppingItem(item?.id)}>
                        Delete item
                    </button>
                </div>
            })}
        </div>
    )
}
export default Task;