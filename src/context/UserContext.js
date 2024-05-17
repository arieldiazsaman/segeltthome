import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFollowingAndFollowers = async () => {
      try {
        const [followingResponse, followersResponse] = await Promise.all([
          axios.get(`http://localhost:5000/following/${userId}`),
          axios.get(`http://localhost:5000/followers/${userId}`)
        ]);
        setFollowing(followingResponse.data);
        setFollowers(followersResponse.data);
      } catch (error) {
        console.error('Error fetching following and followers', error);
      }
    };

    if (userId) {
      fetchFollowingAndFollowers();
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ following, followers, setFollowing }}>
      {children}
    </UserContext.Provider>
  );
};
