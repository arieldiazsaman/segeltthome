import React from 'react';

const Following = () => {

  return (
    <div className="following">
      {[].map(user => (
        <div key={user.id} className="user-followed">
        </div>
      ))}
    </div>
  );
};

export default Following;
