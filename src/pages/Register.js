import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases } from "../utils/appwrite";
import { ID } from "appwrite";

const Register = () => {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = await account.create(ID.unique(), email, password, nom);
      await account.createEmailSession(email, password);

      await databases.createDocument(
        "684d804200186c972268", // DB ID
        "utilisateurs",          // Collection ID
        ID.unique(),
        { nom, email, role }
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Échec de l’inscription");
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <input placeholder="Nom complet" value={nom} onChange={e => setNom(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="client">Client (créancier)</option>
        <option value="juriste">Juriste / Cabinet</option>
      </select>

      <button onClick={handleRegister}>Créer le compte</button>
    </div>
  );
};

export default Register;
