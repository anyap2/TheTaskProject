import { useState, useEffect } from "react";
import { db } from "./Firebase-config.js";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

export default function EditBoard(props) {

  // const boardsCollectionRef = collection(db, "boards");
  const [editBoardTitle, setEditBoardTitle] = useState(props.board.BoardTitle)
  const [editBoardColor, setEditBoardColor] = useState(props.board.Color)

    const updateTitle = async () => {
      const boardRef = doc(db, "boards", props.board.id)
      const updeteTitle = { BoardTitle: editBoardTitle }
      await updateDoc(boardRef, updeteTitle);
      window.location.reload(false);

    }

    const updateColor = async () => {
      const boardRef = doc(db, "boards", props.board.id)
      const updeteColor = { Color: editBoardColor }
      await updateDoc(boardRef, updeteColor);
      window.location.reload(false);

    }

  return (
    <div>

      <input
        type="text"
        placeholder="Title your board"
        value={editBoardTitle}
        onChange={(e) => setEditBoardTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Chose your mood"
        value={editBoardColor}
        onChange={(e) => setEditBoardColor(e.target.value)}
      />

      <button onClick={() => { updateTitle(); updateColor()}}>
        Save the changes
      </button>

    </div>
  );
}
