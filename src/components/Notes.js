import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const history=useNavigate();
    const context = useContext(notecontext);
    const { notes, getNotes, editNote, setNotes } = context;
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "default" })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log("fetching notes");
            console.log(localStorage.getItem('token'))
            getNotes();
            
        }
        else{
            history("/login")
        }
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (notecur) => {
        setNote({ id: notecur._id, title: notecur.title, description: notecur.description, tag: notecur.tag })
        ref.current.click();//to click to the referred item
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleclick = (e) => {
        console.log("updating")
        editNote(note.id, note.title, note.description, note.tag);
        props.showAlert("Note Updated", "success")
        refClose.current.click();

    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button ref={refClose} type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-2'>
                                <div className="form-group">
                                    <label className='my-2' htmlFor="title">Title</label>
                                    <input type="text" className="form-control my-2" id="title" aria-describedby="emailHelp" value={note.title} placeholder="Title" onChange={onChange} name="title" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="desccription" className='my-2'>Description</label>
                                    <input type="text" className="form-control my-2" id="description" placeholder="Description" name="description" value={note.description} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="desccription" className='my-2'>Tag</label>
                                    <input type="text" className="form-control my-2" id="description" placeholder="Description" name="description" value={note.tag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-2'>
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
