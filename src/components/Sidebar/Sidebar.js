import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const { following, followers } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchUsername && searchUsername !== localStorage.getItem('username')) {
      navigate(`/user/${searchUsername}`);
    } else {
      setSearchUsername('');
      navigate('/')
    }
  };

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
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Usuario"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="logout-container">
        <Link to="/logout" className="sidebar__link">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
