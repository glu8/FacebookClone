import { useState } from 'react';
import './App.css';
import Post from './components/Post.js'
import New from './components/New.js'


function App() {

  const [posts, updatePosts] = useState([]);
  const [postKey, updateKey] = useState(0);

  function addPost(newPost) {
    updatePosts([...posts, newPost]);
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

  return (
    <div className="App">
    <h1>Facebook Clone</h1>

    <div className="NewsFeed">

      <New addPost={addPost} postKey={postKey} incrementKey={incrementKey}/>

      {posts.map( (post) => {
        return <Post post={post} likePost={likePost} addComment={addComment} updatePost={updatePost}/>
      })}
    </div>

    </div>
  );
}

export default App;
