import React from 'react'
import NewUser from './NewUser.js';
import New from './New.js';
import Post from './Post.js';
import PostFeed from './PostFeed.js';
import '../App.css';


function NewsFeed(props) {

    return (
        <div className="AppBody">
        {props.user === "" ?  
    
        <div className="Login">
    
    
          { props.createNewUser ? 
          <React.Fragment>
          <NewUser updateCreateNewUser={props.updateCreateNewUser} updateUser={props.updateUser} checkExistingUser={props.checkExistingUser}/>
          </React.Fragment>
          :
          <React.Fragment>
          <input name="user"  value={props.tempUser} onChange={props.handleTempUserChange} />
          <button onClick={() => (props.login())}>Log In</button>
          <button onClick={() => (props.updateCreateNewUser(true))}>Create New User</button>
          </React.Fragment>
          }
    
    
        </div> 
        :
        <div className="NewsFeed">
    
          <New addPost={props.addPost} postKey={props.postKey} incrementKey={props.incrementKey} user={props.user}/>

          <PostFeed user="" posts={props.posts} likePost={props.likePost} addComment={props.addComment} updatePost={props.updatePost}/>

        </div>
    
        }
        </div>
    )
}

export default NewsFeed;