import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    adresse: "",
  });

  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const panierLocal = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierLocal);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification rapide email
    if (!form.email.includes("@")) {
      alert("Veuillez entrer un email valide.");
      return;
    }

    // Ici tu pourrais envoyer la commande au backend
    // await fetch(`${import.meta.env.VITE_API_URL}/orders`, { method: "POST", body: JSON.stringify({ form, panier }) })

    // Pour l’instant → on passe à la page confirmation
    navigate("/confirmation", {
      state: {
        ...form,
        panier,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Informations de livraison
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <textarea
            id="adresse"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Valider et passer à la confirmation
        </button>
      </form>
    </div>
  );
}
