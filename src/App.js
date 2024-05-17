import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Followers from './components/Followers/Followers';
import Following from './components/Following/Following';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout/Logout';
import UserPage from './components/UserPage/UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <>
                <div className="sidebar">
                  <Sidebar />
                </div>
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<PrivateRoute element={Home} />} />
                    <Route path="/seguidores" element={<PrivateRoute element={Followers} />} />
                    <Route path="/seguidos" element={<PrivateRoute element={Following} />} />
                    <Route path="/user/:username" element={<PrivateRoute element={UserPage} />} />
                    <Route path="/logout" element={<PrivateRoute element={Logout}/>}/>
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
