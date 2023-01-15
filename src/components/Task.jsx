import React from "react";
import { useState, useEffect } from "react";
import { db } from '../Firebase-config';
import { collection, getDocs, doc, addDoc, deleteDoc } from 'firebase/firestore';
function Task(
) {
    const [newToDoTask, setNewToDoTask] = useState('')
    const [newItem, setNewItem] = useState('')
    const [newQuantity, setNewQuantity] = useState(0)

    const [toDoPage, setToDoPage] = useState([])
    const [shoppingListPage, setShoppingListPage] = useState([])
    const [ListsPage, setListsPage] = useState([])

    const toDoCollectionRef = collection(db, 'to-do')
    const shoppingListCollectionRef = collection(db, 'shopping-list')
    const ListsCollectionRef = collection(db, 'lists')
    

    const addToDotask = async () => {
        await addDoc(toDoCollectionRef, { name: newToDoTask })
        window.location.reload(true);
    }

    const addItemShopList = async () => {
        await addDoc(shoppingListCollectionRef, { name: newItem, quantity: newQuantity })
        window.location.reload(true);
    }

    useEffect(() => {
        const getToDoPage = async () => {
            const data = await getDocs(toDoCollectionRef)
            console.log(data);
            setToDoPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getToDoPage()
    }, [])

    useEffect(() => {
        const getShoppingListPage = async () => {
            const data = await getDocs(shoppingListCollectionRef)
            console.log(data);
            setShoppingListPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getShoppingListPage()
    }, [])
    useEffect(() => {
        const getListsPage = async () => {
            const data = await getDocs(ListsCollectionRef)
            console.log(data);
            setListsPage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getListsPage()
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
        <form>
            <h1>Your to do list</h1>
            <input placeholder="new to do task..."
                onChange={(event) => { setNewToDoTask(event.target.value) }}>
            </input>
            <button type="button" onClick={() => addToDotask()}>create new task</button>

            <h2>Your tasks:</h2>
            <ul>
                {toDoPage.map((task, index) =>
                    <li key={index}>
                        <label className="strikethrough" htmlFor={index}>{task.name} </label>
                        <br />
                        <button type="button" onClick={() => deleteToDoTask(task?.id)}>
                            Delete task
                        </button>
                    </li>
                )}
            </ul>
            <h1>Your lists</h1>
            <h2>array</h2>
            <ul>
                {ListsPage.map((task, index) =>
                    <li key={index}>
                        <label className="strikethrough" htmlFor={index}>{task.tasks}</label>
                        <label className="strikethrough" htmlFor={index}>{task.item}</label>
                        <label className="strikethrough" htmlFor={index}>{task.quantity}</label>
                    </li>
                )}
            </ul>

            <h1>Your shopping list</h1>
            <input placeholder="your item..."
                onChange={(event) => { setNewItem(event.target.value) }}>
            </input>
            <input type='number' placeholder="how much..."
                onChange={(event) => { setNewQuantity(event.target.value) }}>
            </input>
            <button type="button" onClick={() => addItemShopList()}>create new item</button>
            <h2>Buy:</h2>
            {shoppingListPage.map((item, index) =>
                <div key={index}>
                    {/* <h3>{item.name} <span>({item.quantity})</span> </h3> */}
                    <input type="checkbox" name="packersOff" id={index} value="1" />
                    <label className="strikethrough" htmlFor={index}>{item.name}<span>({item.quantity})</span>  </label>
                    <br />
                    <button type="button" onClick={() => deleteShoppingItem(item?.id)}>
                        Delete item
                    </button>
                </div>
            )}
        </form>
    )
}
export default Task;