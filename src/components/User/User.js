import React, { useState, useEffect } from 'react';

import Todo from '../Todo/Todo';
import Post from '../Post/Post';

import './User.css';

const User = (props) => {

    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);

    const [isOtherData, setisOtherData] = useState(false);

    const [borderLineColor, setBorderLineColor] = useState('2px dashed green');
    const [backgroundColor, setBackgroundColor] = useState('');

    useEffect( () => {
        if (props.user.allTasksCompleted){
            setBorderLineColor('2px solid green');
        }
    } ,[props.user.allTasksCompleted]);

    useEffect( () => {
        if(props.user.id === props.selectedUser.id &&props.selectedUser.isSelected) {
            setBackgroundColor('#00cc99');
        }
        else {
            setBackgroundColor('')
        }
    }, [props.selectedUser])

    const updateUser = () => {
        const user = { id: props.user.id, name:name, email: email, otherData: props.user.otherData };
        props.updateUser(user);
    }

    const deleteUser = () => {
        const user = { id: props.user.id, name:name, email: email, otherData: props.user.otherData };
        props.deleteUser(user);
    }
 
    const selected = () => {
        if (props.selectedUser.id !==0) {
            props.selectedUser.isSelected = !props.selectedUser.isSelected;
        }
        props.setSelected({id: props.user.id ,isSelected: !props.selectedUser.isSelected })
    }

    return (
        <div className="user-card" style={{ border: `${borderLineColor}`, background: `${backgroundColor}`}}>
            <input className="button" type="button" value={`ID: ${props.user.id}`} 
                onClick={ () => selected() } /> <br />
            ID: {props.user.id} <br />
            Name: <input type="text" value={name} onChange={ e => setName(e.target.value)}/> <br />
            Email: <input type="text" value={email} onChange={ e => setEmail(e.target.value)} /> <br />
            <input className="button" type="button" value="Other Data" onClick={() => setisOtherData(!isOtherData)} />
            {
                (isOtherData) ? 
                    <div className="user-card-other-data">
                        Street: <input type="text" value={props.user.otherData.street} /> <br/>
                        City: <input type="text" value={props.user.otherData.city} /> <br/>
                        Zip Code: <input type="text" value={props.user.otherData.zipcode} /> <br/>
                    </div> :
                    null
            }
            <input className="button" type="button" value="Update" onClick={ () => updateUser() } />
            <input className="button" type="button" value="Delete" onClick={ () => deleteUser() } />
            {
                (props.selectedUser.id === props.user.id && props.selectedUser.isSelected && props.isNewUser === false) ?
                <div key={props.user.id} className="todos-and-posts">
                    <Todo todos={props.user.todos} updateCompleted={props.updateCompleted} 
                        addNewTask={props.addNewTask} />
                    <Post posts={props.user.posts} addNewPost={props.addNewPost} />
                </div>
                :
                null
            }
        </div>
    )
}

export default User;