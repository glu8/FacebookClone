import { useState } from 'react';
import './App.css';
import Post from './components/Post.js';
import New from './components/New.js';
import Header from './components/Header.js';

function App() {

  const [posts, updatePosts] = useState([]);
  const [postKey, updateKey] = useState(0);
  const [user, updateUser] = useState("");
  const [tempUser, updateTempUser] = useState("");

  function addPost(newPost) {
    newPost.date = new Date();
    updatePosts([...posts, newPost]);
    console.log(newPost)
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
    tempPosts.filter((post) => (post.key === postKey)).map((post) => { post.title = title; post.body = body; return null; })
    updatePosts(tempPosts);
  }

  function handleTempUserChange(e) {
    updateTempUser(e.target.value);
}

  return (
    <div className="App">

    <Header />

    <div className="AppBody">
    {user === "" ?  

    <div className="Login">
      <input name="user"  value={tempUser} onChange={handleTempUserChange} />
      <button onClick={() => (updateUser(tempUser))}>Submit</button>
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
