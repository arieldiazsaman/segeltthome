import React from 'react';

const Followers = () => {

  return (
    <div className="followers">
      {[].map(user => (
        <div key={user.id} className="following-user">
        </div>
      ))}
    </div>
  );
};

export default Followers;
