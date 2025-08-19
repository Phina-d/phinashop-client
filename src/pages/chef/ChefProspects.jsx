import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChefProspects() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/prospects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProspects(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
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
      const res = await axios.put(`http://localhost:5000/api/prospects/${id}`, editData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      await axios.delete(`http://localhost:5000/api/prospects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProspects(prospects.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Chargement des prospects...</p>;
  if (error) return <p style={{color: 'red'}}>Erreur : {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des Prospects</h1>
      {prospects.length === 0 ? (
        <p>Aucun prospect trouvé.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <tr key={prospect._id}>
                {editId === prospect._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => submitEdit(prospect._id)}>Enregistrer</button>
                      <button onClick={cancelEdit}>Annuler</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{prospect.name}</td>
                    <td>{prospect.email}</td>
                    <td>{prospect.phone || "-"}</td>
                    <td>
                      <button onClick={() => startEdit(prospect)}>Modifier</button>
                      <button
                        onClick={() => deleteProspect(prospect._id)}
                        style={{ color: "red", marginLeft: 10 }}
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
