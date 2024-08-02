/* eslint-disable react/prop-types */
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NoteContext);

    const changeColor = () => {
        try {
            const curentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            )

            const updatedNote = {
                ...notes[curentNoteIndex],
                colors: JSON.stringify(color)
            };

            const newNotes = [...notes];
            newNotes[curentNoteIndex] = updatedNote;
            setNotes(newNotes);

            db.notes.update(selectedNote.$id, { colors: JSON.stringify(color) });

        } catch (error) {
            alert("You must select a note to change its color. Please select a note by clicking on it.");
        }
    };

  return (
    <div className='color'onClick={changeColor} style={{ backgroundColor: color.colorHeader }}>

    </div>
  )
}

export default Color