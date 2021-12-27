import React, { useState } from 'react'


function Post(props) {

    const [comment, updateComment] = useState("");
    const [commentKey, updateCommentKey] = useState(0);

    function handleCommentChange(e) {
        updateComment(e.target.value);
    }

    return (
        <div>
            <p>{props.post.title}</p>
            <p>{props.post.body}</p>
            <p>{props.post.likes} likes</p>

            {props.post.comments.map((comment) => ( <p> {comment} </p>))}

            <input name="comment" value={comment} onChange={handleCommentChange}/>

            <button onClick={() => {
                props.likePost(props.post.key)}}>Like</button>

            <button onClick={() => {
                props.addComment(props.post.key, comment);
                updateComment("");
                }}>Comment</button>
        </div>
    )
}

export default Post
