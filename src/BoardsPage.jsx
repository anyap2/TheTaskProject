import { useState, useEffect } from "react";
import { db } from "./Firebase-config.js";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import BoardsList from "./BoardsList.jsx";
import EditBoard from "./EditBoard.jsx";

export default function BoardsPage() {
  const boardsCollectionRef = collection(db, "boards");

  const [boardsList, setBoardsList] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardColor, setNewBoardColor] = useState();

  const createBoard = async () => {
    await addDoc(boardsCollectionRef, {
      BoardTitle: newBoardTitle,
      Color: Number(newBoardColor),
    });
    window.location.reload(false);
  };

  return (
    <div>
      <h1>Your boards</h1>

      <div>
        
        <input
          type="text"
          placeholder="Title your board"
          onChange={(event) => {
            setNewBoardTitle(event.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Chose your mood"
          onChange={(event) => {
            setNewBoardColor(event.target.value);
          }}
        />

        <button onClick={createBoard}>Create board</button>

        <BoardsList boardsList={boardsList} setBoardsList={setBoardsList} />
        {/* <EditBoard setNewBoardTitle={setNewBoardTitle} setNewBoardColor={setNewBoardColor}/> */}
      </div>
    </div>
  );
}
