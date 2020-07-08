import React, { useState } from 'react'

import './Post.css';

const Post = (props) => {

    const [isNewPost, setIsNewPost] = useState(false);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const newPost = () => {
        let post = {userId: props.posts[0].userId ,id: 0, title: title, body: body }
        props.addNewPost(post);
        setIsNewPost(false);
    }

    return(
        <div className="posts-list">
            <h3>Posts User: {props.posts[0].userId}</h3>
            <input className="button add" type="button" value="Add" onClick={ () => setIsNewPost(true) } />

            {
                (isNewPost) ? 
                <div className="new-post">
                    Title: <input type='text' onChange={ async (e) => await setTitle(e.target.value) } /><br />
                    Body: <input type='text' onChange={ async (e) => await setBody(e.target.value) } /><br />
                    <input className="button" type="button" value="Add" onClick={ () => newPost() } />
                    <input className="button" type="button" value="Cancel" onClick={ () => setIsNewPost(false) } />
                </div>
                :
                props.posts.map( (post) => {
                    return (
                        <div key={post.id} className="post-card">
                            {post.id} <br />
                            Title: {post.title} <br />
                            Body: {post.body} 
                        </div>)
                } )
            }
            
        </div>
    )
}

export default Post;