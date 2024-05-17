import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import './Followers.css'

const Followers = () => {
  const userId = localStorage.getItem('userId');
  const { setFollowing } = useContext(UserContext);
  const { followers, following } = useContext(UserContext);
  const username = localStorage.getItem('username')

  const isfollowingUser = (userId) => {
    return following?.find( user => user.id === userId);
  }

  const handleFollow = async (followedId) => {
    try {
      await axios.post('http://localhost:5000/follow', {
        follower_id: userId,
        following_id: followedId
      });
      const response = await axios.get(`http://localhost:5000/following/${userId}`);
      setFollowing(response.data);
    } catch (error) {
      console.error('Error following user', error);
    }
  };

  return (
    <div className="followers">
      <h2>Seguidores</h2>
      <div className="users">
        {followers?.filter(user => `${user.id}` !== userId).map(user => (
          <div key={user.id} className="user">
            { user.username !== username ?
              <Link to={`/user/${user.username}`}>
                <h4>{user.username}</h4>
              </Link> :
              <h4>{user.username}</h4>
            }
            <p>{user.name}</p>
            {!isfollowingUser(user.id) ? (
              <button
                className="follow-button"
                onClick={() => handleFollow(user.id)}
              >
                Seguir
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
