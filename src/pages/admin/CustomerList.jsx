import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import axios from "axios";

const API_URL = "https://phinashop-backend.onrender.com/api";

export default function CustomerList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/orders/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      console.error("Erreur chargement clients :", err);
    }
  };

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-green-600" size={32} />
        <h1 className="text-2xl font-bold text-green-700">Liste des Clients</h1>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500">Aucun client trouvé pour le moment.</p>
      ) : (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Date d'inscription</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => (
              <tr key={client._id} className="hover:bg-gray-50">
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{client.client?.name || "Inconnu"}</td>
                <td className="p-2 border">{client.client?.email || "-"}</td>
                <td className="p-2 border">
                  {new Date(client.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
