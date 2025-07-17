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
