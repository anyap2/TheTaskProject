<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useContext } from "react";
=======
import { useState, useEffect, useContext } from "react";
>>>>>>> bc504c2 (bit of changes to connected vers)
=======
import { useEffect, useContext } from "react";
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)
import { db } from "../Firebase-config.js";
import { collection, getDocs, doc, deleteDoc, } from "firebase/firestore";
import EditBoard from "./EditBoard.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "react-bootstrap";
import { Storage } from "../App.js";
<<<<<<< HEAD
<<<<<<< HEAD
import Card from 'react-bootstrap/Card';;
=======
>>>>>>> bc504c2 (bit of changes to connected vers)
=======
import Card from 'react-bootstrap/Card';;
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)


export default function BoardsList() {
  const boardsCollectionRef = collection(db, "boards");

<<<<<<< HEAD
<<<<<<< HEAD
  const { boardsList, setBoardsList, showEditWindow, setShowEditWindow, selectedColor, setSelectedColor } = useContext(Storage)

=======
  const { boardsList, setBoardsList, newBoardColor, newBoardTitle, setNewBoardColor,
    setNewBoardTitle, showEditWindow, setShowEditWindow, mapBoard, setMapBoard
  } = useContext(Storage)

  // const [clonBoardsList, setClonBoardsList]=useState(boardsList)
>>>>>>> bc504c2 (bit of changes to connected vers)
=======
  const { boardsList, setBoardsList, showEditWindow, setShowEditWindow, selectedColor, setSelectedColor } = useContext(Storage)

>>>>>>> c7ed6b3 ( anyasFull,little bit progress)

  useEffect(() => {
    const getBoards = async () => {
      const data = await getDocs(boardsCollectionRef);
      setBoardsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getBoards();
<<<<<<< HEAD
<<<<<<< HEAD
  }, []);


  const deleteBoard = async (id) => {
    try {
      if (!id) alert('no id')
      console.log(db, id);
      const boardDoc = doc(db, "boards", id)
      await deleteDoc(boardDoc)
=======
  }, [
    // boardsList
  ]);
=======
  }, []);
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)


  const deleteBoard = async (id) => {
    try {
      if (!id) alert('no id')
      console.log(db, id);
      const boardDoc = doc(db, "boards", id)
<<<<<<< HEAD
      deleteDoc(boardDoc)
>>>>>>> bc504c2 (bit of changes to connected vers)
=======
      await deleteDoc(boardDoc)
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)
        return (<Card key={index}
          bg={board?.Color.toLowerCase()}
          text={board?.Color.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2">
<<<<<<< HEAD

          <Card.Title>{board?.Color.toString()} </Card.Title>
          <Card.Text>
           {board?.Title.toString()}
           {board?.Color.toString()}
          </Card.Text>
          <i type='button' onClick={() => { setShowEditWindow(index) }} className="bi bi-pencil-square">
            Edit
          </i>

          <i type='button' onClick={() => deleteBoard(board?.id)} className="bi bi-pencil-square">
            Delete Board
          </i>
          {
            showEditWindow === index ?
              <Alert variant={board?.Color}>
                <EditBoard data={boardsList[index]} />
              </Alert> : <></>}

        </Card>)
      })
      }    </div>)
}
=======
        return (
          <Alert key={index}>
            <div role="group" aria-label="Basic example">
=======
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)

          <Card.Title>{board?.Color.toString()} </Card.Title>
          <Card.Text>
           {board?.Title.toString()}
           {board?.Color.toString()}
          </Card.Text>
          <i type='button' onClick={() => { setShowEditWindow(index) }} className="bi bi-pencil-square">
            Edit
          </i>

          <i type='button' onClick={() => deleteBoard(board?.id)} className="bi bi-pencil-square">
            Delete Board
          </i>
          {
            showEditWindow === index ?
              <Alert variant={board?.Color}>
                <EditBoard data={boardsList[index]} />
              </Alert> : <></>}

<<<<<<< HEAD
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
>>>>>>> bc504c2 (bit of changes to connected vers)
=======
        </Card>)
      })
      }    </div>)
}
>>>>>>> c7ed6b3 ( anyasFull,little bit progress)
