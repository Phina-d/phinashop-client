import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://phinashop-backend.onrender.com/api";

export default function OrdersToConfirm() {
  const [orders, setOrders] = useState([]);
  const [emailSentOrderId, setEmailSentOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/orders/to-confirm`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Erreur chargement commandes à confirmer :", err);
    }
  };

  const handleConfirm = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      // Confirmer la commande
      await axios.patch(`${API_URL}/orders/confirm/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Récupérer les détails de la commande
      const { data: confirmedOrder } = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!confirmedOrder.products || confirmedOrder.products.length === 0) {
        throw new Error("Aucun produit dans la commande.");
      }

      const emailPayload = {
        to: confirmedOrder.client.email,
        subject: "Confirmation de votre commande",
        client: { name: confirmedOrder.client.name },
        total: confirmedOrder.total,
        cart: confirmedOrder.products.map((p) => ({
          name: p.product.name,
          quantity: p.quantity,
          price: p.price,
        })),
      };

      // Envoyer l'e-mail
      await axios.post(`${API_URL}/orders/${orderId}/send-email`, emailPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmailSentOrderId(orderId);
      setTimeout(() => setEmailSentOrderId(null), 3000);

      alert("✅ Commande confirmée et e-mail envoyé.");
      fetchOrders();
    } catch (err) {
      console.error("❌ Erreur confirmation ou e-mail :", err);
      alert("Erreur lors de la confirmation ou de l’envoi de l’e-mail.");
    }
  };

  const handleReject = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/orders/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Commande rejetée !");
      fetchOrders();
    } catch (err) {
      console.error("❌ Erreur rejet commande :", err);
      alert("Erreur lors du rejet de la commande.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commandes à confirmer</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande en attente.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Client</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border p-2">{order.client?.name || "Inconnu"}</td>
                <td className="border p-2">{order.total.toLocaleString()} FCFA</td>
                <td className="border p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleConfirm(order._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => handleReject(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Rejeter
                  </button>
                  {emailSentOrderId === order._id && (
                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                      📧 Mail envoyé
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
