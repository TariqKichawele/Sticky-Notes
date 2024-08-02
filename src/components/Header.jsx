import { useContext } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";
import logo from "../assets/notes_logo.png";

const Header = () => {
    const { setNotes } = useContext(NoteContext);

    const clearAllNotes = async () => {
        try {
            await db.notes.deleteall();
            setNotes([]);
        } catch (error) {
            console.error(error);
        }
    }
  return (
   <>
    <div className='header'>
        <div className="content">
            <div className="header-logo">
                <img src={logo} alt="logo" className="logo" />
                <h1>StickyNotes</h1>
            </div>

            <button className='clear-btn' onClick={clearAllNotes}>
                Clear All Notes
            </button>
        </div>
    </div>
   </>
  )
}

export default Header