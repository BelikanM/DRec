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
