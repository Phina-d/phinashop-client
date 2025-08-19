import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProspectList() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/orders/prospects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProspects(res.data);
    } catch (err) {
      console.error("Erreur chargement prospects", err);
      setError("Impossible de charger les prospects.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-500 p-4">Chargement des prospects...</p>;
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commandes rejetées / Prospects</h2>
      {prospects.length === 0 ? (
        <p>Aucun prospect pour le moment.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Rejetée le</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border p-2">{order.client?.name || "Inconnu"}</td>
                <td className="border p-2">{order.total.toLocaleString()} FCFA</td>
                <td className="border p-2">
                  {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
