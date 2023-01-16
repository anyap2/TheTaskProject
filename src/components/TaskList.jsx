import { db } from "../Firebase-config.js";
import { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Storage } from "../App.js";
import "./details.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function TaskList() {
   

    const { boardsList, editIndex, boardId,  setTaskIndex , boardIndex} = useContext(Storage)
    console.log("boardlist ",boardsList);
    const board = boardsList[editIndex]
    const boardRef = doc(db, "boards", boardId)

    return (
        <div className="detailsBody">
            {/* {boardsList[boardIndex].map((item, index)=>{
            //         console.log(board)
            // return board.tasksList?.map((item, index) =>
            
                <Form key={index} onClick={() => setTaskIndex(index)} >
                    <Form.Group name="packersOff" id={index} defaultValue="1"
                        className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label lassName="strikethrough" htmlFor={index}>{item}
                            ({item})</Form.Label>
                        <p>{item}</p>
                        <Form.Check type="checkbox" label="" />
                    </Form.Group>

                    <Button variant="primary" type="button"
                    // onClick={() => deleteTask(item?.id)}
                    >
                        Delete
                    </Button>
                </Form>}
                )
                
            // }) */}
            {/* } */}
            
        </div >
        // <div className="detailsBody">
        //     {boardsList[].map((board)=>{
        //             console.log(board)
        //     return board.tasksList?.map((item, index) =>
            
        //         <Form key={index} onClick={() => setTaskIndex(index)} >
        //             <Form.Group name="packersOff" id={index} defaultValue="1"
        //                 className="mb-3" controlId="formBasicCheckbox">
        //                 <Form.Label lassName="strikethrough" htmlFor={index}>{item}
        //                     ({item})</Form.Label>
        //                 <p>{item}</p>
        //                 <Form.Check type="checkbox" label="" />
        //             </Form.Group>

        //             <Button variant="primary" type="button"
        //             // onClick={() => deleteTask(item?.id)}
        //             >
        //                 Delete
        //             </Button>
        //         </Form>)
                
        //     })
        //     }
            
        // </div >
    )
}