import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ModifierClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données du client
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du client.");
        setLoading(false);
      }
    };
    fetchClient();
  }, [id, token]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  // Envoyer la modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/users/${id}`, client, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Client modifié avec succès !");
      navigate("/closer/clients");
    } catch (error) {
      if (error.response) {
        alert(
          `Erreur modification client : ${error.response.data.message || JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        alert("Erreur modification client : pas de réponse du serveur.");
      } else {
        alert(`Erreur modification client : ${error.message}`);
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!client) return <p>Client introuvable.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Modifier le client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="prenom">
            Prénom
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            value={client.prenom || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="nom">
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            value={client.nom || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={client.email || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ModifierClient;
