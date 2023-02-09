import React, { useContext, useState } from 'react'
import notecontext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(notecontext);
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleclick=(e)=>{
        e.preventDefault();
        document.getElementById("title").value="";
        document.getElementById("description").value="";
        document.getElementById("tag").value="";
        addNote(note.title,note.description,note.tag);
    }
    return (
        <div>
            <div className='container my-1'>
                <h1>Add a Note</h1>
                <form className='my-2'>
                    <div className="form-group">
                        <label className='my-2' htmlFor="title">Title</label>
                        <input type="text" className="form-control my-2" id="title" aria-describedby="emailHelp" placeholder="Title" onChange={onChange} name="title"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className='my-2'>Description</label>
                        <input type="text" className="form-control my-2" id="description" placeholder="Description" name="description" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag" className='my-2'>Tag</label>
                        <input type="text" className="form-control my-2" id="tag" placeholder="Tag" name="tag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary my-4" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
