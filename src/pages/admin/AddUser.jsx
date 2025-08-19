import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Utilisation de la variable d'environnement pour l'URL backend
const API_URL = process.env.REACT_APP_API_URL + "/api/users";

export default function AddUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "client",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté pour ajouter un utilisateur.");
        return;
      }

      await axios.post(API_URL, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Utilisateur ajouté avec succès !");
      navigate("/admin/users");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Ajouter un utilisateur</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Nom"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="client">Client</option>
          <option value="closer">Closer</option>
          <option value="chef">Chef de service</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
