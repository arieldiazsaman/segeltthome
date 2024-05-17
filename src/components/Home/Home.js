import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts-from-following-and-followers/${userId}`);
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts');
      }
    };

    fetchPosts();
  }, [userId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postContent.length > 280) {
      setError('Post content exceeds 280 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/post', {
        owner_id: userId,
        owner_name: localStorage.getItem('username'),
        text: postContent
      });
      setPosts([response?.data?.post, ...posts]);
      setPostContent('');
      setError('');
    } catch (error) {
      setError('Error creating post');
    }
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <form onSubmit={handlePostSubmit} className="post-form">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          maxLength="280"
          placeholder="Qué está pasando!?"
          className="post-textarea"
        />
        <button type="submit" className="post-button">Post</button>
      </form>
      {error ? <p className="error-message">{error}</p> : null}
      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h4>{post.owner_name}</h4>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
