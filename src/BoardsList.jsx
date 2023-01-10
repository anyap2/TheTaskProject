import { useState, useEffect } from "react";
import { db } from "./Firebase-config.js";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, } from "firebase/firestore";
import EditBoard from "./EditBoard.jsx";

export default function BoardsList(props) {

  const boardsCollectionRef = collection(db, "boards");

  const [showEditWindow, setShowEditWindow] = useState(false)

  useEffect(() => {
    const getBoards = async () => {
      const data = await getDocs(boardsCollectionRef);

      props.setBoardsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      // console.log(data)
    };
    getBoards();
  }, []);



  const deleteBoard = async (id) => {
    const boardDoc = doc(db, "boards", id)
    await deleteDoc(boardDoc)
    window.location.reload(false);
  };


  return (
    <div>

      {props.boardsList.map((board, index) => {
        return (

          <div key={index}>

            <p>{board?.BoardTitle}</p>
            <p>{board?.Color}</p>

            <button onClick={() => { setShowEditWindow(index) }}>
              Edit
            </button>

            <button onClick={() => deleteBoard(board?.id)}>
              Delete Board
            </button>

            {showEditWindow === index &&
              <div className="alert alert-secondary">
                <EditBoard setShowEditWindow={setShowEditWindow} board={board} />
              </div>}

          </div>
        );
      })}

    </div>
  );
}
