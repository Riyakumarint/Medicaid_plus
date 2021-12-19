import './style.css'
import logo from './logo2.png'
import Todos from "./Todos";
import Addtodo from "./Addtodo";
import React, { useState, useEffect } from 'react';
import Apointments from './Apointments';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  function Appoinment_doc() {
    let initTodo;
    if (localStorage.getItem("todos") === null) {
      initTodo = [];
    }
    else {
      initTodo = JSON.parse(localStorage.getItem("todos"))
    }
    console.log("INITTODO ", initTodo);
    const onDelete = (todo) => {
      console.log("Deleting ", todo);
      // deleting this way doesnot work
      //let index = todos.indexOf(todo);
      //todos.slice(index,1);
  
      setTodos(todos.filter((e) => {
        return e !== todo;
      }))
    }
    const addTodo = (title, desc) => {
      let snmo = todos.length > 0 ? todos[todos.length - 1].sno + 1 : 1;
      const mytodo = {
        sno: snmo,
        title: title,
        desc: desc
      }
      console.log(mytodo);
      setTodos([...todos, mytodo]);
  
    }
  
    const [todos, setTodos] = useState(initTodo);
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
  
    return (
      <Router>
        <Switch>
        <Route exact path="/Appointments_doc" render= {() =>{
          return(
            <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Apointments/>
            <Addtodo addtodo={addTodo} />
            <Todos todos={todos} deleteing={onDelete} />
            </>
          )}}>
          </Route>
        </Switch>
      </Router>
    );
  }
  
  export default Appoinment_doc;
  