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
