#!/bin/bash

echo "📁 Création de la structure React frontend..."

# Se placer dans le dossier src
cd src || { echo "Erreur : le dossier src n'existe pas."; exit 1; }

# Création des dossiers
mkdir -p assets components context hooks pages styles

# Fichiers globaux
cat > index.js <<'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
EOF

cat > App.js <<'EOF'
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
EOF

# CSS global
cat > styles/global.css <<'EOF'
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f9f9;
}
a {
  text-decoration: none;
  color: inherit;
}
nav {
  background: #222;
  color: white;
  padding: 10px;
}
.container {
  padding: 2rem;
}
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px #ddd;
  margin-bottom: 1rem;
}
EOF

# NavBarForter
cat > components/NavBarForter.js <<'EOF'
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarForter() {
  return (
    <nav>
      <h3>⚖️ Forter Recouvrement</h3>
      <ul style={{ display: 'flex', gap: '1rem' }}>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/appels">Appels</Link></li>
        <li><Link to="/recherche">Recherche</Link></li>
        <li><Link to="/">Se déconnecter</Link></li>
      </ul>
    </nav>
  );
}
EOF

# AuthContext
cat > context/AuthContext.js <<'EOF'
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (u) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
EOF

# ProtectedRoute
cat > components/ProtectedRoute.js <<'EOF'
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}
EOF

# Card
cat > components/Card.js <<'EOF'
import React from 'react';

export default function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
EOF

# Login page
cat > pages/Login.js <<'EOF'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('client');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ email, role });
    navigate('/clients');
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="juriste">Juriste</option>
      </select><br />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
EOF

# RegisterClient
cat > pages/RegisterClient.js <<'EOF'
import React from 'react';

export default function RegisterClient() {
  return (
    <div className="container">
      <h2>Inscription Client</h2>
      <input placeholder="Nom" /><br />
      <input placeholder="Email" /><br />
      <input placeholder="Téléphone" /><br />
      <input placeholder="Adresse" /><br />
      <input placeholder="Entreprise" /><br />
      <button>S'inscrire</button>
    </div>
  );
}
EOF

# RegisterJuriste
cat > pages/RegisterJuriste.js <<'EOF'
import React from 'react';

export default function RegisterJuriste() {
  return (
    <div className="container">
      <h2>Inscription Juriste ou Cabinet</h2>
      <input placeholder="Nom" /><br />
      <input placeholder="Email" /><br />
      <input placeholder="Spécialité" /><br />
      <input placeholder="Téléphone" /><br />
      <input placeholder="Ville ou zone d’intervention" /><br />
      <button>S'inscrire</button>
    </div>
  );
}
EOF

# Clients page
cat > pages/Clients.js <<'EOF'
import React from 'react';
import Card from '../components/Card';

export default function Clients() {
  return (
    <div className="container">
      <h2>Liste des Clients à recouvrer</h2>
      <Card title="Client A" content="Créance : 5 000 FCFA - Dernier contact : 01/06/2025" />
      <Card title="Client B" content="Créance : 12 000 FCFA - Dossier transmis au juriste." />
    </div>
  );
}
EOF

# Chat
cat > pages/Chat.js <<'EOF'
import React from 'react';

export default function Chat() {
  return (
    <div className="container">
      <h2>Messagerie / Chat Juridique</h2>
      <p>(Simule ici des messages entre client et juriste)</p>
    </div>
  );
}
EOF

# Appels
cat > pages/Appels.js <<'EOF'
import React from 'react';

export default function Appels() {
  return (
    <div className="container">
      <h2>Historique des Appels</h2>
      <p>🕒 Appel avec Client B - 10 minutes</p>
      <p>🕒 Appel avec Cabinet X - 15 minutes</p>
    </div>
  );
}
EOF

# Recherche
cat > pages/Recherche.js <<'EOF'
import React from 'react';

export default function Recherche() {
  return (
    <div className="container">
      <h2>🔍 Rechercher un juriste ou cabinet</h2>
      <input placeholder="Domaine, Ville, Cabinet..." style={{ width: '100%', padding: '0.5rem' }} />
      <div className="card">Cabinet LegalPro – Droit OHADA – Libreville</div>
    </div>
  );
}
EOF

echo "✅ Tous les fichiers frontend React ont été créés avec succès dans le dossier src/"
