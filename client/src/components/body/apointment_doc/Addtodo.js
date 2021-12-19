import React from 'react'
import { useState } from 'react';
export default function Addtodo(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const submit=(e)=>{
        e.preventDefault();
        if(!title || !desc){
            alert("Title Or Description Cannot be blank");
        }
        else{
            props.addtodo(title,desc);
            setTitle("");
            setDesc("");
        }
    };
    return (
        <div className="container">
            <h3>Add A Medicen</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Medicen Title</label>
                    <input type="text" value={title} onChange={(e)=>{
                        setTitle(e.target.value);
                    }} className="form-control" id="title" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Medicen's Description</label>
                    <input type="text" value={desc} onChange={(e)=>{
                        setDesc(e.target.value);
                    }} className="form-control" id="desc" aria-describedby="emailHelp"/>
                    <br/>
                    <label htmlFor="desc" className="form-label">Medicen's Doze</label>
                    <input type="text Area" value={desc} onChange={(e)=>{
                        setDesc(e.target.value);
                    }} className="form-control" id="desc" aria-describedby="emailHelp"/>
                </div>
                <button type="submit" className="btn btn-sm btn-primary">Add A Medicen</button>
            </form>
        </div>
    )
}
