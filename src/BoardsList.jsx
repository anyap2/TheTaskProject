import { useState, useEffect } from "react";
import { db } from "./Firebase-config.js";
import { collection, getDocs, doc, deleteDoc, } from "firebase/firestore";
import EditBoard from "./EditBoard.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "react-bootstrap";


export default function BoardsList(props) {

  const boardsCollectionRef = collection(db, "boards");

  const [showEditWindow, setShowEditWindow] = useState(false)

  useEffect(() => {
    const getBoards = async () => {
      const data = await getDocs(boardsCollectionRef);

      props.setBoardsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getBoards();
  }, []);


  const deleteBoard = async (id) =>{
    console.log(id);
    const boardDoc = doc(db, "boards", id)
    // console.log(boardDoc)
    await deleteDoc(boardDoc)
    window.location.reload(true);
  };


  return (
    <div>

      {props.boardsList.map((board, index) => {
        return (

          <Alert key={index}>
            <p>{board?.Title}</p>

            <div role="group" aria-label="Basic example">
              <i onClick={() => { setShowEditWindow(index) }} className="bi bi-pencil-square">
                Edit
              </i>

              <p>{board?.Color}</p>

              <button type="button" onClick={() => deleteBoard(board?.id)}>
                Delete Board
              </button>
            </div>

            {
              showEditWindow === index &&
              <Alert>
                <EditBoard setShowEditWindow={setShowEditWindow} board={board} />
              </Alert>
            }
          </Alert>


        );
      })}

    </div>
  );
}
