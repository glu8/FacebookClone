import React from 'react'
import '../App.css';
import Post from './Post.js';


function PostFeed(props) {

    return (
        <div className="PostFeed">

            {props.posts.filter((post) => {return (props.user === "")||(post.user === props.user)}).map( (post) => {
            return <Post post={post} likePost={props.likePost} addComment={props.addComment} updatePost={props.updatePost}/>
          })}
        </div>
    )

}

export default PostFeed;