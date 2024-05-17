import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar__link">
        <i className="fas fa-home"></i> Principal
      </Link>
      <Link to="/seguidores" className="sidebar__link">
        <i className="fas fa-user-friends"></i> Seguidores
      </Link>
      <Link to="/seguidos" className="sidebar__link">
        <i className="fas fa-user-plus"></i> Seguidos
      </Link>
      <Link to="/logout" className="sidebar__link">
        <i className="fas fa-sign-out-alt"></i> Logout
      </Link>
    </div>
  );
};

export default Sidebar;
