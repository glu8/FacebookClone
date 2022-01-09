import React, { useState } from 'react'
import '../App.css';
import PostFeed from './PostFeed.js'

function Profile(props) {

    return (
        <div className="Profile">
            <h1>User Profile</h1>
            <p>{props.userData.name}</p>
            <p>{props.userData.location}</p>
            <PostFeed posts={props.posts} user={props.userData.username} likePost={props.likePost} addComment={props.addComment} updatePost={props.updatePost}/>

        </div>
    )

}

export default Profile;