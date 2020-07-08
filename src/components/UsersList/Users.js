import React, { useState } from 'react';

import MyContext from '../../MyContext';

import User from '../User/User';

const Users = (props) => {

    const [selectedUser, setSelectedUser] = useState({id: 0, isSelected: false});

    const [idNewTodo, setIdNewTodo] = useState(200);
    const [idNewPost, setIdNewPost] = useState(100);
    

    const taskToadd = (task) => {
        // setIdNewTodo(idNewTodo => (idNewTodo+1));
        task.id = idNewTodo + 1;
        setIdNewTodo(task.id);
        props.addNewTaskToTodos(task)
    }

    const postToadd = (post) => {
        post.id = idNewPost + 1;
        setIdNewPost(post.id);
        props.addNewPost(post);
    }
    
    return (
        <MyContext.Consumer>
        {
            context => (
                context.users.map( user => {
                    return <User key={user.id} user={user} updateUser={props.update} deleteUser={props.delete}
                    selectedUser={selectedUser} setSelected={ (selected) => setSelectedUser(selected) }
                    updateCompleted={props.updateCompletedTask}
                    addNewTask={ (task) => taskToadd(task) }
                    addNewPost = { (post) => postToadd(post) }
                    isNewUser={context.isNewUser}
                />
                } )
            )
        }
        </MyContext.Consumer>
    )
}

export default Users;