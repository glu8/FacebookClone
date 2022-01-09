import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Profile from './components/Profile.js';
import NewsFeed from './components/NewsFeed.js';
import Home from './Home.js';

function App() {

  const [posts, updatePosts] = useState([]);
  const [postKey, updateKey] = useState(0);
  const [user, updateUser] = useState("");
  const [tempUser, updateTempUser] = useState("");
  const [userData, updateUserData] = useState({});
  const [createNewUser, updateCreateNewUser] = useState(false);

  useEffect(() => {    
    getPosts();  
  }, []);

  useEffect(() => {
    console.log('getting user data')
    getUserData();
  }, [user])

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

  async function getUserData() {

    if (user === "") {
      updateUserData({})
    } else {
      return fetch('http://localhost:5000/users?username=' + user)
      .then((response) => response.json())
      .then((json) => updateUserData(json[0]))
      .catch ((error) => console.error(error));
    }
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

  async function checkExistingUser(username) {

    let response = await fetch('http://localhost:5000/users?username=' + username)
    .then((response) => response.json())
    .catch ((error) => console.error(error));

    if (response.length > 0) {
        if (response[0].username === username) {
            return true;
        }
    }

    return false
  }

  async function login() {

    let userExists = await checkExistingUser(tempUser)

    if (!userExists) {
      alert("User does not exist")
      return false;
    } 

    updateUser(tempUser);
    getPosts();
    return true;
  }

  return (

    <Routes>
      <Route path="/" element={<Home user={user} userData={userData} updateUser={updateUser}/>}>
        <Route path="/" element={<NewsFeed user={user} createNewUser={createNewUser} updateCreateNewUser={updateCreateNewUser} updateUser={updateUser} checkExistingUser={checkExistingUser} tempUser={tempUser} handleTempUserChange={handleTempUserChange} login={login} addPost={addPost} postKey={postKey} incrementKey={incrementKey} posts={posts} likePost={likePost} addCOmment={addComment} updatePost={updatePost}/>} />
        <Route path="/profile" element={<Profile userData={userData} likePost={likePost} addComment={addComment} updatePost={updatePost} posts={posts}/>} />
      </Route>
    </Routes>

  );
}

export default App;
