import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// API URL dynamique via variable d'environnement
const API_URL = process.env.REACT_APP_API_URL + "/api/users";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des données utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Chargement du profil...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mb-4"
      >
        ← Retour
      </button>

      <h2 className="text-2xl font-semibold mb-4">Profil de {user.name}</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Téléphone :</strong> {user.phoneNumber || "N/A"}</p>
        <p><strong>Rôle :</strong> {user.role.replace(/_/g, " ")}</p>
      </div>
    </div>
  );
}
