import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChefCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/chef/commandes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommandes(res.data);
      } catch (err) {
        if (err.response) {
          setError(
            `Erreur: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
          );
        } else {
          setError("Erreur lors du chargement des commandes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Chargement des commandes...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Commandes des Closers</h1>
      <p className="mb-6 text-gray-600">Suivi des commandes affectées à vos closers.</p>

      {commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande à traiter pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2 text-left">ID Commande</th>
                <th className="border p-2 text-left">Client</th>
                <th className="border p-2 text-left">Statut</th>
                <th className="border p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((cmd) => (
                <tr key={cmd._id} className="hover:bg-gray-50">
                  <td className="border p-2">{cmd._id}</td>
                  <td className="border p-2">{cmd.clientId?.name || "N/A"}</td>
                  <td className="border p-2 capitalize">{cmd.statut}</td>
                  <td className="border p-2">
                    {new Date(cmd.createdAt || cmd.dateCommande).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
