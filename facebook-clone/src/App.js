import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post.js';
import New from './components/New.js';
import Header from './components/Header.js';
import NewUser from './components/NewUser.js';

function App() {

  const [posts, updatePosts] = useState([]);
  const [postKey, updateKey] = useState(0);
  const [user, updateUser] = useState("");
  const [tempUser, updateTempUser] = useState("");
  const [createNewUser, updateCreateNewUser] = useState(false);

  useEffect(() => {    getPosts();  }, []);


  async function addPost(newPost) {
    newPost.date = new Date();
    await submitPost(newPost)
    getPosts();
  }

  function incrementKey() {
    updateKey(postKey + 1);
  }

  function likePost(postKey, increment) {
    let tempPosts = [...posts]
    console.log(increment)
    tempPosts.filter((post) => (post.key === postKey)).map((post) => ( post.likes = post.likes + increment ));
    updatePosts(tempPosts)
  }

  function addComment(postKey, comment) {
    let tempPosts = [...posts];
    tempPosts.filter((post) => (post.key === postKey)).map((post) => (post.comments = [...post.comments, comment]));
    updatePosts(tempPosts);
  }

  function updatePost(postKey, title, body) {
    let tempPosts = [...posts];
    tempPosts.fildter((post) => (post.key === postKey)).map((post) => { post.title = title; post.body = body; return null; })
    updatePosts(tempPosts);
  }

  function handleTempUserChange(e) {
    updateTempUser(e.target.value);
  }
 
  async function getPosts() {
    return fetch("http://localhost:5000/posts")
    .then((res) => res.json())
    .then(json => updatePosts(json))
    .catch ((error) => console.error(error));
  }

  async function submitPost(newPost) {
    return fetch("http://localhost:5000/posts", {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
    }).then((response) => response.json())
    .catch(error => console.log(error))
  }

  return (
    <div className="App">

    <Header user={user} updateUser={updateUser}/>
    <button onClick={getPosts}>Get Posts</button>
    <button onClick={submitPost}>Submit Post</button>

    <div className="AppBody">
    {user === "" ?  

    <div className="Login">


      { createNewUser ? 
      <React.Fragment>
      <NewUser updateCreateNewUser={updateCreateNewUser} updateUser={updateUser} />
      </React.Fragment>
      :
      <React.Fragment>
      <input name="user"  value={tempUser} onChange={handleTempUserChange} />
      <button onClick={() => (updateUser(tempUser))}>Submit</button>
      <button onClick={() => (updateCreateNewUser(true))}>Create New User</button>
      </React.Fragment>
      }


    </div> 
    :
    <div className="NewsFeed">

      <New addPost={addPost} postKey={postKey} incrementKey={incrementKey} user={user}/>

      {posts.map( (post) => {
        return <Post post={post} likePost={likePost} addComment={addComment} updatePost={updatePost}/>
      })}
    </div>

    }
    </div>
    </div>
  );
}

export default App;
