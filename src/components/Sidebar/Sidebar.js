import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const { following, followers } = useContext(UserContext);

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar__link">
        <i className="fas fa-home"></i> Principal
      </Link>
      <Link to="/seguidores" className="sidebar__link">
        <i className="fas fa-user-friends"></i> Seguidores: { followers?.length > 1 ? followers.length - 1 : 0 }
      </Link>
      <Link to="/seguidos" className="sidebar__link">
        <i className="fas fa-user-plus"></i> Seguidos { following?.length > 1 ? following.length - 1 : 0 }
      </Link>
      <Link to="/logout" className="sidebar__link">
        <i className="fas fa-sign-out-alt"></i> Logout
      </Link>
    </div>
  );
};

export default Sidebar;
