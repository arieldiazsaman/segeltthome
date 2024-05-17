import React from 'react';
import './Home.css';

const Home = () => {

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      {[].map(post => (
        <div key={post.id} className="feed__post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
