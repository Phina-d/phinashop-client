import React, { useEffect, useState } from "react";
import axios from "axios";

// URL de l'API depuis variable d'environnement
const API_URL = process.env.REACT_APP_API_URL + "/api/prospects";

export default function ChefProspects() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProspects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProspects();
  }, []);

  const startEdit = (prospect) => {
    setEditId(prospect._id);
    setEditData({
      name: prospect.name,
      email: prospect.email,
      phone: prospect.phone || "",
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", email: "", phone: "" });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submitEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProspects(prospects.map((p) => (p._id === id ? res.data : p)));
      cancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const deleteProspect = async (id) => {
    if (!window.confirm("Supprimer ce prospect ?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProspects(prospects.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Chargement des prospects...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-2xl font-bold mb-4">Liste des Prospects</h1>
      {prospects.length === 0 ? (
        <p>Aucun prospect trouvé.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-b">Nom</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Téléphone</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <tr key={prospect._id} className="even:bg-gray-50">
                {editId === prospect._id ? (
                  <>
                    <td className="p-2">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => submitEdit(prospect._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Annuler
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{prospect.name}</td>
                    <td className="p-2">{prospect.email}</td>
                    <td className="p-2">{prospect.phone || "-"}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => startEdit(prospect)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteProspect(prospect._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
