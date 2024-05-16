import React from 'react';

const Home = () => {

  return (
    <div className="feed">
      {[].map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
