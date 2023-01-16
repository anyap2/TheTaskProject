import './boardsList.css'
import { useState, useEffect, useContext } from "react";
import { db } from "../Firebase-config.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "react-bootstrap";
import { Storage } from "../App.js";
import Card from 'react-bootstrap/Card';;


export default function BoardsList() {
  const boardsCollectionRef = collection(db, "boards");

  const { boardIndex, setBoardIndex, boardsList, setBoardsList, showEditWindow, setShowEditWindow, editIndex, setEditIndex,setShowTaskWindow
    , setBoardId } = useContext(Storage)

  useEffect(() => {
    const getBoards = async () => {
      const data = await getDocs(boardsCollectionRef);
      setBoardsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getBoards();
  }, []);

  const deleteBoard = (id, index) => {
    try {
      const boardDoc = doc(db, "boards", id)
      deleteDoc(boardDoc)

      const newArr = boardsList.filter((element, i) => {
        return i !== index
      })
      setBoardsList([...newArr])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="boardsListDiv">

      {boardsList.map((board, index) => {
        return (
          <div onClick={() => { setBoardIndex(index); setBoardId(board?.id); setShowTaskWindow(index) }}>
            <Alert
              key={index}
              variant={board?.Color}
              text={board?.Color === 'light' ? 'dark' : 'white'}
              style={{ width: '12rem' }}
              className="mb-2 p-xs">

              <Card.Title>
                {board?.Title}
              </Card.Title>

              <Card.Text>
                {board?.Color}
              </Card.Text>


              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit"
                width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50"
                fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
                type='button' onClick={() => {
                  showEditWindow === index ? setShowEditWindow("") : setShowEditWindow(index)
                    ; setEditIndex(index)
                }}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash"
                width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50"
                fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
                type='button' onClick={() => deleteBoard(board.id, index)}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </Alert>
          </div>
        )
      })
      }
    </div>)
}
