import React from 'react'

export default function Todo(props) {
    return (
        <>
        <div>
            <h3>{props.todo.sno}</h3>
            <h4>{props.todo.title}</h4>
            <p>{props.todo.desc}</p>
            <button className="btn btn-sm btn-danger" onClick={()=>{props.ondelete(props.todo)}}>Delete</button>
        </div>
        <hr/>
        </>
    )
}
