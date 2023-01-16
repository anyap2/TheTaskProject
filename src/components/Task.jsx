import React from "react";
import { useState, useEffect, useContext } from "react";
import { db } from '../Firebase-config';
import { collection, getDocs, doc, addDoc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Storage } from "../App";

function Task() {

    const location = useLocation()
    const [newToDoTask, setNewToDoTask] = useState('')
    const [newItem, setNewItem] = useState('')
    const [newQuantity, setNewQuantity] = useState(0)

    const [toDoPage, setToDoPage] = useState([])
    const [shoppingListPage, setShoppingListPage] = useState([])
    const [arrayListPage, setArrayListPage] = useState([])
    const [boardItems, setBoardItems] = useState()
    const shoppingListCollectionRef = collection(db, "shopping list")
    const arraysListCollectionRef = collection(db, 'lists')

    const { data, setData } = useContext(Storage)


    const addItemShopList = async () => {
        await addDoc(shoppingListCollectionRef, { name: newItem, quantity: newQuantity })
    }


    useEffect(() => {
        try {
            const getToDoList = async () => {
                const data = await getDocs(arraysListCollectionRef)
                console.log(data);
                setToDoPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            getToDoList()
        }
        catch (error) {
        }
    }, [])

    useEffect(() => {
        try {
            const getArrayListPage = async () => {
                const data = await getDocs(arraysListCollectionRef)
                setArrayListPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            getArrayListPage()
        }
        catch (error) {
        }
    }, [])

    const deleteToDoTask = async (id) => {
        const toDoDoc = doc(db, "to-do", id)
        await deleteDoc(toDoDoc)
        window.location.reload(true);
    };


    const deleteShoppingItem = async (id) => {
        const shoppingItemDoc = doc(db, "shopping-list", id)
        await deleteDoc(shoppingItemDoc)
        window.location.reload(true);
    };

    return (
        <div>
            <h2>Your tasks:</h2>
            <input placeholder="your new task..."
                onChange={(event) => { setData(event.target.value) }}>
            </input>
            <button type="button" >submit</button>

            {arrayListPage.map((task, index) => {
                return <div key={index}>
                    <ul>

                        {task.tasks && task.tasks.map((task2, index) => {
                            console.log(task2)
                            return <li key={index}>{task2}</li>
                        })}
                    </ul>
                </div>
            }
            )
            }
            <h4>izumka</h4>
            {arrayListPage.map((task, index) => {
                return <div key={index}>
                    <ul>
                        {task.item && task.item.map((task4, index) => {
                            console.log(task4)
                            return <li key={index}>{task4}</li>
                        })}
                    </ul>
                </div>
            }
            )
            }




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
                return 
                <div key={index}>
                    <h3>{item.name} <span>({item.quantity})</span> </h3>
                    <button type="button" onClick={() => deleteShoppingItem(item?.id)}>
                        Delete item
                    </button>
                </div>
            })
            }
        </div >

    )
}
export default Task;