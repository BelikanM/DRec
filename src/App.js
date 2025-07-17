import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarForter from './components/NavBarForter';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import RegisterClient from './pages/RegisterClient';
import RegisterJuriste from './pages/RegisterJuriste';
import Clients from './pages/Clients';
import Chat from './pages/Chat';
import Appels from './pages/Appels';
import Recherche from './pages/Recherche';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBarForter />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-juriste" element={<RegisterJuriste />} />
          <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/appels" element={<ProtectedRoute><Appels /></ProtectedRoute>} />
          <Route path="/recherche" element={<ProtectedRoute><Recherche /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
