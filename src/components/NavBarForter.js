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
