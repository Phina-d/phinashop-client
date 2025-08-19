import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// URL de l'API depuis variable d'environnement
const API_URL = process.env.REACT_APP_API_URL;

const ClientProfileCloser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des données client.");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Es-tu sûr(e) de vouloir supprimer ce client ?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Client supprimé avec succès.");
      navigate("/closer/liste-clients"); // Redirige vers la liste
    } catch (err) {
      alert("Erreur lors de la suppression du client.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!client) return <p>Client introuvable.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Retour à la liste
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Fiche client : {client.prenom} {client.nom}
      </h2>

      <div className="space-y-2 text-gray-700 mb-6">
        <p><strong>Email :</strong> {client.email}</p>
        <p><strong>Téléphone :</strong> {client.telephone || "-"}</p>
        <p><strong>Adresse :</strong> {client.adresse || "-"}</p>
        <p><strong>Rôle :</strong> {client.role}</p>
        <p><strong>Date d’inscription :</strong>{" "}
          {new Date(client.createdAt).toLocaleDateString("fr-FR")}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/closer/modifier-client/${client._id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          📝 Modifier
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          ❌ Supprimer
        </button>
      </div>
    </div>
  );
};

export default ClientProfileCloser;
