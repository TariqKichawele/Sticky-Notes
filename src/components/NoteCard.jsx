/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
    const body = bodyParser(note.body);
    const colors = JSON.parse(note.colors);

    const { setSelectedNote } = useContext(NoteContext);

    const [ position, setPosition ] = useState(JSON.parse(note.position));
    const [ saving, setSaving ] = useState(false);

    const keyUpTimer = useRef(null);
    const textareaRef = useRef(null);
    const cardRef = useRef(null);

    let mouseStartPos = { x: 0, y: 0 };

    useEffect(() => {
        autoGrow(textareaRef);
        setZIndex(cardRef.current);
    }, [])

    const mouseDown = (e) => {
      if(e.target.className === 'card-header') {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        setZIndex(cardRef.current);
        setSelectedNote(note);
      }
    }

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    }

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };

        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }

        setSaving(false);
    };

    const handleKeyUp = () => {
        setSaving(true);

        if(keyUpTimer.current) clearTimeout(keyUpTimer.current);

        keyUpTimer.current= setTimeout(() => {
            saveData("body", textareaRef.current.value);
        }, 2000);
    }

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        console.log(mouseMoveDir);

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    }

  return (
    <div
        className="card"
        style={{
            backgroundColor: colors.colorBody,
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}
        ref={cardRef}
    >

        <div 
            className="card-header" 
            style={{ backgroundColor: colors.colorHeader }} 
            onMouseDown={mouseDown}
        >
            <DeleteButton noteId={note.$id}/>
            {
                saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText}/>
                        <span style={{ color: colors.colorText }}>Saving...</span>
                    </div>
                )
            }
        </div>
        <div className="card-body">
            <textarea 
                onKeyUp={handleKeyUp}
                defaultValue={body} 
                style={{ color: colors.colorText }} 
                ref={textareaRef} 
                onInput={() => autoGrow(textareaRef)}
                onFocus={() => {
                    setZIndex(cardRef.current);
                    setSelectedNote(note);
                }}
            />
        </div>
    </div>
  )
}

export default NoteCard