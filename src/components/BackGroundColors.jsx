import { switchCase } from "@babel/types";
import { useContext } from "react";

export default function BackGroundColors() {

    const { selectedColor, setSelectedColor, backGround, setBackGround, } = useContext(Storage)

    switch (selectedColor) {
        case 'primary':
            setBackGround('primary')
            break;
            

        // 'secondary',
        // 'success',
        // 'danger',
        // 'warning',
        // 'info',
        // 'light',
        // 'dark',
    }
    return (
        <div>

        </div>
    )
}