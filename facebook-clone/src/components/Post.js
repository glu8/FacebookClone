import React, { useState } from 'react';
import Comment from './Comment.js';
import '../App.css';

function Post(props) {

    const [comment, updateComment] = useState("");
    const [commentKey, updateCommentKey] = useState(0);
    const [liked, updateLiked] = useState(0);
    const [edit, updateEdit] = useState(0);

    const [title, updateTitle] = useState(props.post.title);
    const [body, updateBody] = useState(props.post.body)

    function handleCommentChange(e) {
        updateComment(e.target.value);
    }

    function handleBodyChange(e) {
        updateBody(e.target.value);
    }

    return (
        <div className="Post">
            <div className="UserInfo">
                <p>{props.post.user}</p>
            </div>

            <div>
               { edit ? 
               <div>
               <input name="body" value={body} onChange={handleBodyChange}/>
               <button onClick={() => { 
                   props.updatePost(props.post.key, title, body)
                   updateEdit(0); }}>Update</button> 
               </div> : 
               <div>
                <p>{props.post.body}</p>
               <button onClick={() => (updateEdit(1))}>Edit Post</button>
               </div> }
            </div>

            <p>{props.post.likes} likes</p>

            <input name="comment" value={comment} onChange={handleCommentChange}/>
            
            { !liked ?  <button onClick={() => {
                props.likePost(props.post.key, 1);
                updateLiked(1);
                }}>Like</button>  
                : <button onClick={() => {
                props.likePost(props.post.key, -1);
                updateLiked(0);
                }}>Unlike</button> }

            <button onClick={() => {
                props.addComment(props.post.key, comment);
                updateComment("");
                }}>Comment</button>

            {props.post.comments.map((comment) => ( 
                
                <Comment comment={comment}/>
                
                ))}

        </div>
    )
}

export default Post;
