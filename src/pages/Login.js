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
