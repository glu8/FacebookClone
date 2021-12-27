import React, { useState } from 'react'

function Comment(props) {

    const [edit, updateEdit] = useState(0);
    const [comment, updateComment] = useState(props.comment);

    function handleCommentChange(e) {
        updateComment(e.target.value);
    }

    return (
        <div> 
        { edit ? <input name="comment" value={comment} onChange={handleCommentChange}/> : <p>{props.comment}</p> }
        { edit ? <button onClick={() => (updateEdit(0))}>Update</button> : <button onClick={() => (updateEdit(1))}>Edit</button> }
        </div>
    )

}

export default Comment;
