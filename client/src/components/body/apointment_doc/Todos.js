import React from 'react'
import Todo from './Todo'
export default function Todos(props) { 
    let myStyle={
        minHeight: "20vh"
    }
    return (
        <div className="container" style={myStyle}>
            <h3>
                Medicens
            </h3>
            {props.todos.length===0 ?"No Medicens To display": 
            props.todos.map((todo)=>{
                return <Todo todo={todo} key={props.sno} ondelete={props.deleteing}/>  
            })}
            
                      
        </div>
    )
}