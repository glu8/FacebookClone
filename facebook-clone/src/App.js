import { useState } from 'react';
import './App.css';
import Post from './components/Post.js'
import New from './components/New.js'


function App() {

  const [posts, updatePosts] = useState([]);
  const [postKey, updateKey] = useState(0);

  function addPost(newPost) {
    console.log(newPost)
    updatePosts([...posts, newPost]);
  }

  function incrementKey() {
    updateKey(postKey + 1);
  }

  function likePost(postKey) {
    let tempPosts = [...posts]
    console.log(postKey)
    tempPosts.filter((post) => (post.key === postKey)).map((post) => ( post.likes++ ));
    updatePosts(tempPosts)
  }

  function addComment(postKey, comment) {
    let tempPosts = [...posts];
    tempPosts.filter((post) => (post.key === postKey)).map((post) => (post.comments = [...post.comments, comment]));
    updatePosts(tempPosts);
  }

  return (
    <div className="App">

    <div className="NewsFeed">
      
      <button onClick={() => {console.log(postKey)}}>log key</button>

      <New addPost={addPost} postKey={postKey} incrementKey={incrementKey}/>

      {posts.map( (post) => {
        return <Post post={post} likePost={likePost} addComment={addComment}/>
      })}
    </div>

    </div>
  );
}

export default App;
