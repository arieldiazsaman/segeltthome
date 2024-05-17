import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Following.css'

const Following = () => {
  const userId = localStorage.getItem('userId');
  const { following } = useContext(UserContext);

  return (
    <div className="following">
      <h2>Following</h2>
      <div className="users">
        {following?.filter( user => `${ user.id }` !== userId ).map(user => (
          <div key={user.id} className="user">
            <h4>{user.username}</h4>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
