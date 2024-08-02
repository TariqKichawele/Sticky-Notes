import { useContext, useRef } from "react"
import Plus from "../icons/Plus"
import colors from "../assets/colors.json";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
    const { setNotes } = useContext(NoteContext);

    const startingPos = useRef(200);

    const addNote = async () => {
        const payload = {
            position: JSON.stringify({ 
                x: startingPos.current,
                y: startingPos.current
            }),
            colors: JSON.stringify(colors[0])
        };

        startingPos.current += 100;

        await db.notes.create(payload)
        setNotes((prevState) => [payload, ...prevState])
    };
  return (
    <div id="add-btn" onClick={addNote}>
        <Plus />
    </div>
  )
}

export default AddButton