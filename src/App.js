import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Followers from './components/Followers';
import Following from './components/Following';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/seguidores" element={Followers} />
          <Route path="/seguidos" element={Following} />
          <Route path="/logout"/>
          <Route path="/" element={Home} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
