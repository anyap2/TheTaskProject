import { useState, useEffect, useContext } from "react";
import { db } from "../Firebase-config.js";
import { collection, getDocs, doc, deleteDoc, } from "firebase/firestore";
import EditBoard from "../EditBoard.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "react-bootstrap";
import { Storage } from "../App.js";


export default function BoardsList() {
  const boardsCollectionRef = collection(db, "boards");

  const { boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
    setNewBoardTitle, showEditWindow, setShowEditWindow, mapBoard, setMapBoard
  } = useContext(Storage)

  useEffect(() => {
    const getBoards = async () => {
      const data = await getDocs(boardsCollectionRef);
      setBoardsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getBoards();
  }, []);


  const deleteBoard = (id) => {
    try {
      if(!id) alert('no id')
      console.log(db, id);
      const boardDoc = doc(db, "boards", id)
      deleteDoc(boardDoc)
      let temp = boardsList
      temp = temp.filter(element => element.id !== id)
      setBoardsList([...temp])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {boardsList.map((board, index) => {
        return (
          <Alert key={index}>
            <div role="group" aria-label="Basic example">

              <p>{board?.Title}</p>
              <p>{board?.Color}</p>
              

              <i type='button' onClick={() => { setShowEditWindow(index) }} className="bi bi-pencil-square">
                Edit
              </i>

              <i type='button' onClick={() => deleteBoard(board?.id)} className="bi bi-pencil-square">
                Delete Board
              </i>

            </div>

            {
              showEditWindow === index &&
              <Alert>
                <EditBoard data={boardsList[index]}/>
              </Alert>
            }

          </Alert>
        );
      })}
    </div>
  );
}
