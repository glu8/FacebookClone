import React, { useState } from 'react'
import Post from './Post';

function New(props) {

    const [post, updatePost] = useState({
        key: props.postKey
    });

    function handleChange(e) {
        updatePost({
            ...post,
            [e.target.name]: e.target.value,
            key: props.postKey,
            likes: 0,
            comments: [],
        });
        console.log(post)
    }

    return (
        <div>
            <h1>test</h1>
            <input name="title" value={post.title} onChange={handleChange} />
            <input name="body" value={post.body} onChange={handleChange}/>
            <button onClick={() => {console.log(props)}}>log postKey</button>

            <button onClick={() => {
                props.addPost(post);
                updatePost({
                    title: "",
                    body: "",
                    key: props.postKey
                })
                props.incrementKey();
                }}>Submit</button>
        </div>
    )
}

export default New
