import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">Principal</Link>
      <Link to="/seguidores">Seguidores</Link>
      <Link to="/seguidos">Seguidos</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Sidebar;
