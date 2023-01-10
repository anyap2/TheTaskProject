import { useState } from "react";
import { useEffect } from "react";
import { db } from './Firebase-config'
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import Countdown from 'react-countdown';

function Details() {
    const [tasks, setTasks] = useState()
    const [time, setTime]=useState(86400)
    
    const boardsCollectionRef = doc(db, "boards", "XJLUvyRd4Tx6rSxhhtxp")
    // to be replaced with id taken from list page +id name for the headline^^^

    useEffect(() => {
        const getBoards = async () => {
            const data = await getDoc(boardsCollectionRef);
            setTasks(JSON.stringify(data.data()))
        };
        getBoards()
    }, [])
    const Completionist = () => alert("You are good to go!");
function PlusDay() {
    setTime(time+86400000)
}
    return (
        <div className="DetailsMain">
            <div className="DetailsTop">
                {/* ID used as headline for the detailspage */}
            </div>
            <div className="DetailsBody">
                <ul>
                    <li>{tasks}</li>
                </ul>
            </div>
            <div className="DetailsBot">
                {/* set deadline for the list add % of work done add strikeout for text and delet buttons */}
                <button onClick={()=>PlusDay()}>Add one day</button>
            </div>
            <Countdown date={Date.now() + time}>
      <Completionist />
    </Countdown>
        </div>
    );
}
export default Details;

