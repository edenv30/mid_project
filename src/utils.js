import axios from 'axios';

const getUsersList = async () => {
    try {
        let resp = await axios.get('https://jsonplaceholder.typicode.com/users');
        let data = resp.data;
        if(data)
        { return data.map( (user) => {
            return  {id: user.id, name: user.name, email: user.email,
                otherData: {street : user.address.street , city: user.address.city , zipcode: user.address.zipcode}
              
               }  
        })}
    }
    
    catch(err) {
        console.log('Error getUsersList: ', err)
    }
}


// const getUsersList = async () => {
//     try {
//         let resp = await axios.get('https://jsonplaceholder.typicode.com/users');
//         let data = resp.data;
//         if(data)
//         { return data.map( async (user) => {
//             let todos = await getTodosUser(user.id);
//             let posts = await getPostsUser(user.id);
//             let updateUser = await assign(user, todos, posts)
//             return updateUser   
//         })}
//     }
    
//     catch(err) {
//         console.log('Error getUsersList: ', err)
//     }
// }

// const assign = (user, todos, posts) => {
//     return {id: user.id, name: user.name, email: user.email,
//         otherData: {street : user.address.street , city: user.address.city , zipcode: user.address.zipcode},
//         todos: todos, posts: posts
//        }
    
// }

const getTodosUser = async (userId) => {
    try{
        let resp = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        let data = resp.data;
        let todos = data.filter( task => {
            return task.userId === userId;
        } )
    
        return todos;
    }
    catch(err) {
        console.log('Error getTodosUser: ', err);
    }
}

const getPostsUser = async (userId) => {
    try {
        let resp = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        let data = resp.data;
        let posts = data.filter( task => {
            return task.userId === userId;
        } )
    
        return posts;
    }
    catch(err) {
        console.log('Error getPostsUser: ', err);
    }
}

const updateUser = async (user) => {
    try 
    {
        let resp = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        console.log('UPDATE USER DATA', resp.data)
    }
    catch(err) {
        console.log('ERROR updateUser: ', err);
    }
   
}

const deleteUser = async (user) => {
    try {
        let resp = await axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        console.log('DELETE USER', resp.data)
    }
    catch(err) {
        console.log('ERROR deleteUser: ', err);
    }
}

const updateIsTaskCompletedInTodos = async (task) => {
    try {
        let resp = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
        console.log('UPDATE POST COMPLETE', resp.data)
    } 
    catch(err) {
        console.log('ERROR updateIsTaskCompletedInTodos: ', err);
    }
}

const addNewTodo = async (task) => {
    try {
        let obj = {userId: task.userId , title: task.title, completed: task.completed }
        let resp = await axios.post(`https://jsonplaceholder.typicode.com/todos`, obj)
        console.log('Add TODO ', resp.data)
    }
    catch(err) {
        console.log('ERROR addNewTodo: ', err);
    }
}

const addNewPost = async (post) => {
    try {
        let obj = {userId: post.userId , title: post.title, body: post.body}
        let resp = await axios.post(`https://jsonplaceholder.typicode.com/posts`, obj)
        console.log('Add POST ', resp.data)
    }
    catch(err) {
        console.log('ERROR addNewPost: ', err);
    }
}

const addNewUser = async (user) => {
    try {
        let obj = {name: user.name, email: user.email}
        let resp = await axios.post(`https://jsonplaceholder.typicode.com/users`, obj)
        console.log('Add USER ', resp.data)
        return resp.data;
    }
    catch(err) {
        console.log('ERROR addNewUser: ', err);
    }
}

export default {getUsersList, getTodosUser, getPostsUser, updateUser, deleteUser,
            updateIsTaskCompletedInTodos, addNewTodo, addNewPost, addNewUser};