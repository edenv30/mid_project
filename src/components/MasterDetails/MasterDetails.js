import React, {useState, useEffect} from 'react';

import MyContext from '../../MyContext';

import utils from '../../utils';
import Users from '../UsersList/Users';

import './MasterDetails.css';

const MasterDetails = () => {

    const [usersOrigin, setUsersOrigin] = useState([]);
    const [users,setUsers] = useState([]);
    const [searchField, setSearchField] = useState('');

    const [isTaskCompleted, setIsTaskCompleted] = useState(false);

    const [isNewUser, setIsNewUser] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newUser, setNewUser] = useState('');

    useEffect( () => {
        let usersList ;
        async function  forAwait() {
            await utils.getUsersList().then(resp => usersList = resp );
            await usersList.map( user => {
                utils.getTodosUser(user.id).then( resp => user.todos = resp);
                utils.getPostsUser(user.id).then( resp => user.posts = resp);
                return user;
            // user.allTasksCompleted = false;
            } )
        setUsers(usersList);
        setUsersOrigin(usersList);
        }
        
        forAwait();
    }, [] );

    // useEffect( () => {
    //     utils.getUsersList().then(resp =>{ setUsers(resp);
    //     setUsersOrigin(resp); })
    // }, [] );

    useEffect( ()=> {
        const filteredUsers = usersOrigin.filter( (user) => 
          user.name.toLowerCase().includes(searchField.toLowerCase()) 
        );
        setUsers(filteredUsers);
    }, [searchField]);

    useEffect( () => {
        checkIfAllTodosDone();
        setUsers(users => users);
        setUsersOrigin(usersOrigin => usersOrigin);
       
    }, [isTaskCompleted, newUser]);
    // point view - in the start not havee a user that all the task completed & new task initial completed: false
    const checkIfAllTodosDone = () => {
        try {
            users.map( user => {
                let flag = true;
                user.todos.map(task => {
                    if(task.completed === false)
                        flag = false;
                        return task;
                } )
                return user.allTasksCompleted = flag;
            } )
            usersOrigin.map( user => {
                let flag = true;
                user.todos.map(task => {
                    if(task.completed === false)
                        flag = false;
                        return task;
                } )
                return user.allTasksCompleted = flag;
            } )
        }
        catch(e) {
            console.error('Error: ', e);
        }
        
        // setUsers(users);
        // setUsersOrigin(usersOrigin);
    }

    const handleChange = (e) => {
        setSearchField(e.target.value);
    }

    const updateUser = (userToUpdate) => {
        let newUsers = users.map( user => {
            if(user.id === userToUpdate.id) {
              user = userToUpdate
            }
            return user;
        } )
        setUsers(newUsers);
        utils.updateUser(userToUpdate);
    }

    const deleteUser = (userToDelete) => {
        let newUsers = users.filter( user => user.id !== userToDelete.id )
        setUsers(newUsers);
        utils.deleteUser(userToDelete);
    }

    const updateCompleted = (task, index) => {
        // change in the user list
        setIsTaskCompleted(!isTaskCompleted);
        try {
            users[task.userId-1].todos[index].completed = true;
            usersOrigin[task.userId-1].todos[index].completed = true;
            //change in the server -> utils files -> create a function
            utils.updateIsTaskCompletedInTodos(task);
        }
        catch(e) {
            console.error('Error: ', e)
        }
       
    }

    const addNewTask = (task) => {
        //add to state  
        try {
            let lenTodosUser =  users[task.userId-1].todos.length;
            users[task.userId-1].todos[lenTodosUser] = task;
            usersOrigin[task.userId-1].todos[lenTodosUser] = task;
            //add to server -> function in utils file
            utils.addNewTodo(task);

        }
        catch(e) {
            console.error('Error: ', e)
        }
    }

    const addNewPost = (post) => {
        try {
            let lenPostsUser =  users[post.userId-1].posts.length;
            users[post.userId-1].posts[lenPostsUser] = post;
            usersOrigin[post.userId-1].posts[lenPostsUser] = post;
            //add to server -> function in utils file
            utils.addNewPost(post);
        }
        catch(e) {
            console.error('Error: ', e)
        }
    }

    const addNewUser = async () => {
        let user = {name: name, email: email}
        setNewUser(user)
        let userRest = await utils.addNewUser(user)
        users.push(userRest);
        // usersOrigin.push(userRest);
        setIsNewUser(false);
    }

    return (
        <MyContext.Provider value={{users, isNewUser}}>
            <div>
                <div className="title-search-button">
                    <h1 id="users-h1">Users: </h1>
                    Serach: <input type='search' placeholder='Search User' onChange={handleChange} />
                    <input className="button add" type="button" value="Add" onClick={ () => setIsNewUser(true)} />
                </div>
                {
                    (isNewUser) ? 
                    <div className="new-user">
                        <h3>Add New User</h3> <br />
                        Name: <input type='text' onChange={ async (e) => await setName(e.target.value) } /><br />
                        Email: <input type='text' onChange={ async (e) => await setEmail(e.target.value) } /><br />
                        <input className="button" type="button" value="Add" onClick={ () => addNewUser() } />
                        <input className="button" type="button" value="Cancel" onClick={ () => setIsNewUser(false) } />
                    </div> 
                    :
                    null
                }
                <section className="users-list">
                    <Users 
                        update={userToUpdate => updateUser(userToUpdate)}
                        delete={userToDelete => deleteUser(userToDelete)}
                        updateCompletedTask={ (task, index) => updateCompleted(task, index) }
                        addNewTaskToTodos={ (task) => addNewTask(task) }
                        addNewPost= { (post) => addNewPost(post) } />
                </section>
            </div>
        </MyContext.Provider>
    )
}

export default MasterDetails;