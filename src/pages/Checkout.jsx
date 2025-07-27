import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    adresse: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Optionnel : envoyer les données à un backend
    navigate("/confirmation");
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Finalisez votre commande</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Votre nom complet"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Votre adresse email"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          placeholder="Adresse de livraison"
          required
          className="w-full px-4 py-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Valider le paiement
        </button>
      </form>
    </section>
  );
}
