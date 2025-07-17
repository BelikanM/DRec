import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBarForter from './components/NavBarForter';
import NavHead from './components/NavHead';
import Clients from './pages/Clients';
import Recherche from './pages/Recherche';
import Appels from './pages/Appels';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <NavHead />
        {isAuthenticated && <NavBarForter />}
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path="/clients" element={<Clients />} />
              <Route path="/recherche" element={<Recherche />} />
              <Route path="/appels" element={<Appels />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<Navigate to="/clients" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
