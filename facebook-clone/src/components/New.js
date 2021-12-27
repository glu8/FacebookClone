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
            <input name="title" value={post.title} onChange={handleChange} />
            <input name="body" value={post.body} onChange={handleChange}/>

            <button onClick={() => {
                props.addPost(post);
                updatePost({
                    title: "",
                    body: "",
                    key: props.postKey
                })
                props.incrementKey();
                }}>Post</button>
        </div>
    )
}

export default New
