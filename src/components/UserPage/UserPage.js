import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import './UserPage.css';

const UserPage = ({ match }) => {
  const { username } = useParams();
  const mainUserId = localStorage.getItem('userId');
  const { following, setFollowing } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState('Feed');
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/user/${username}`);
        if (userResponse.data && userResponse.data.id) {
          const userId = userResponse.data.id;
          setSelectedUserId(userId);

          const [postsResponse, followersResponse, followingResponse] = await Promise.all([
            axios.get(`http://localhost:5000/posts/${userId}`),
            axios.get(`http://localhost:5000/followers/${userId}`),
            axios.get(`http://localhost:5000/following/${userId}`)
          ]);

          setPosts(postsResponse.data);
          setFollowers(followersResponse.data);
          setFollowingUsers(followingResponse.data);

          const isFollowingUser = following.find(user => user.id === userId);
          setIsFollowing(!!isFollowingUser);
          setUserNotFound(false);
        } else {
          setUserNotFound(true);
        }
      } catch (error) {
        setUserNotFound(true);
        console.error('Error fetching data', error);
      }
    };

    fetchUserData();
  }, [username, following]);

  const handleFollowUnfollow = async () => {
    try {
      if (isFollowing) {
        await axios.post('http://localhost:5000/unfollow', {
          follower_id: mainUserId,
          following_id: selectedUserId
        });
      } else {
        await axios.post('http://localhost:5000/follow', {
          follower_id: mainUserId,
          following_id: selectedUserId
        });
      }
      const response = await axios.get(`http://localhost:5000/following/${mainUserId}`);
      setFollowing(response.data);
    } catch (error) {
      console.error('Error following/unfollowing user', error);
    }
  };

  if (userNotFound) {
    return (
      <div className="user-page">
        <h2>Usuario no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="user-page">
      <button className="follow-unfollow-button" onClick={handleFollowUnfollow}>
        {isFollowing ? 'Dejar de seguir' : 'Seguir'}
      </button>
      <div className="tabs">
        <button className={activeTab === 'Feed' ? 'active' : ''} onClick={() => setActiveTab('Feed')}>Feed</button>
        <button className={activeTab === 'Followers' ? 'active' : ''} onClick={() => setActiveTab('Followers')}>Seguidores: { followers?.length > 1 ? followers.length - 1 : 0 }</button>
        <button className={activeTab === 'Following' ? 'active' : ''} onClick={() => setActiveTab('Following')}>Seguidos: { followingUsers?.length > 1 ? followingUsers.length - 1 : 0 }</button>
      </div>
      <div className="tab-content">
        {activeTab === 'Feed' && (
          <div className="feed">
            {posts.map(post => (
              <div key={post.id} className="post">
                <h4>{post.owner_name}</h4>
                <p>{post.text}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Followers' && (
          <div className="followers">
            {followers?.filter( user => user.username !== username ).map(user => (
              <div key={user.id} className="user">
                <h4>{user.username}</h4>
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Following' && (
          <div className="following">
            {followingUsers?.filter( user => user.username !== username ).map(user => (
              <div key={user.id} className="user">
                <h4>{user.username}</h4>
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
