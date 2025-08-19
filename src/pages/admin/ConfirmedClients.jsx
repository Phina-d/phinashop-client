import React, { useEffect, useState } from "react";
import axios from "axios";

// Utilisation de la variable d'environnement pour l'URL backend
const API_URL = process.env.REACT_APP_API_URL + "/api";

export default function ConfirmedClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  const fetchConfirmedOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/orders/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      console.error("Erreur chargement clients confirmés", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commandes confirmées</h2>
      {clients.length === 0 ? (
        <p className="text-gray-500">Aucune commande confirmée pour le moment.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Montant</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border p-2">{order.client?.name || "Inconnu"}</td>
                <td className="border p-2">{order.client?.email || "-"}</td>
                <td className="border p-2">{order.total.toLocaleString()} FCFA</td>
                <td className="border p-2">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
                    {order.status}
                  </span>
                </td>
                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
