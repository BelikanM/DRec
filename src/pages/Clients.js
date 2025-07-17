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
