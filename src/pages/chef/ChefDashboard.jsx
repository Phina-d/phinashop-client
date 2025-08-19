import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ChefDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour voir le tableau de bord.");
      return;
    }

    axios
      .get("/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message));
  }, []);

  if (error)
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (!stats)
    return <p className="text-gray-500 text-center mt-10">Chargement...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tableau de Bord - Chef</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          to="profil"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mon profil
        </Link>
        <Link
          to="commandes"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Commandes à traiter
        </Link>
        <Link
          to="prospects"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Liste des prospects
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Statistiques Générales</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Utilisateurs</th>
              <th className="border p-2">Commandes à confirmer</th>
              <th className="border p-2">Commandes confirmées</th>
              <th className="border p-2">Revenus (FCFA)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border p-2">{stats.totalUsers}</td>
              <td className="border p-2">{stats.ordersToConfirm}</td>
              <td className="border p-2">{stats.confirmedOrders}</td>
              <td className="border p-2">{stats.totalRevenue.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
