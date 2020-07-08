import React, { useState } from 'react';
import './Todo.css';

const Todo = (props) => {

    const [isNewTodo, setIsNewTodo] = useState(false);
    // const [idNewTodo, setIdNewTodo] = useState(200);
    const [title, setTitle] = useState('');

    // useEffect(  () => {
    //     if(title){
    //     let task = {userId: props.todos[0].userId ,id: idNewTodo , title: title, completed: false }
    //     props.addNewTask(task);
    //     setIsNewTodo(false);}
    // }, [idNewTodo])
    // <input type="button" value="Add2" onClick={ () => {let temp = idNewTodo +1;setIdNewTodo(temp)} } />

    const newTaskTodos = () => {
        try {
            let task = {userId: props.todos[0].userId ,id: 0, title: title, completed: false }
            props.addNewTask(task);
            setIsNewTodo(false);
        }
        catch(e) {
            console.error('Error: ', e);
        }
    }

    return( 
        <div className="todos-list">
        <h3>Todos User: {props.todos[0].userId}</h3>
        <input className="button add" type="button" value="Add" onClick={ () => setIsNewTodo(true) } />
        {
            (isNewTodo) ? 
            <div className="new-todo">
                Title: <input type='text' onChange={ async (e) => await setTitle(e.target.value) } />
                <input className="button" type="button" value="Add" onClick={ () => newTaskTodos() } />
                <input className="button" type="button" value="Cancel" onClick={ () => setIsNewTodo(false) } />
            </div>
            :
            props.todos.map( (task, index) => {
                return (
                    <div key={task.id} className="task-card">
                        {task.id} <br />
                        Title: {task.title} <br />
                        Completed: {(task.completed) ? 'Yes' : 'No'} 
                        {(!task.completed) ? 
                        <input className="button" type="button" value="Mark Completed" onClick={ () => props.updateCompleted(task,index) } />
                        :
                        null} <br />
                    </div>)
            })
        }
        </div>
    )
}

export default Todo;