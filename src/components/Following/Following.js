import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Following.css'

const Following = () => {
  const userId = localStorage.getItem('userId');
  const { following } = useContext(UserContext);
  const username = localStorage.getItem('username')

  return (
    <div className="following">
      <h2>Siguiendo</h2>
      <div className="users">
        {following?.filter( user => `${ user.id }` !== userId ).map(user => (
          <div key={user.id} className="user">
            { user.username !== username ?
              <Link to={`/user/${user.username}`}>
                <h4>{user.username}</h4>
              </Link> :
              <h4>{user.username}</h4>
            }
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
