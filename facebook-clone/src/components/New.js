import React, { useState } from 'react'
import '../App.css';

function New(props) {

    const [post, updatePost] = useState({
        key: props.postKey,
        user: props.user
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
        <div className="New">
            {/* <input name="title" className="smallInput blockChild" value={post.title} onChange={handleChange} /> */}
            <textarea name="body" className="newPost" value={post.body} onChange={handleChange} rows="5"/>

            <button onClick={() => {
                props.addPost(post);
                updatePost({
                    user: "",
                    body: "",
                    date: "",
                    key: props.postKey
                })
                props.incrementKey();
                }}>Post</button>
        </div>
    )
}

export default New
