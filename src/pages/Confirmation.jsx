import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Confirmation() {
  const { cart, total } = useContext(CartContext);

  // Exemple de données client, tu pourras les récupérer via formulaire ou contexte utilisateur
  const client = {
    nom: "Mme NDIAYE",
    email: "mndiaye@example.com",
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Merci pour votre commande !</h2>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Facture</h3>

        <div className="mb-4">
          <p><strong>Nom :</strong> {client.nom}</p>
          <p><strong>Email :</strong> {client.email}</p>
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="p-2 text-left">Produit</th>
              <th className="p-2 text-left">Quantité</th>
              <th className="p-2 text-left">Prix unitaire</th>
              <th className="p-2 text-left">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.price} €</td>
                <td className="p-2">{(item.price * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-right text-xl font-bold">
          Total : {total.toFixed(2)} €
        </h3>
      </div>

      <div className="flex flex-col items-center gap-4 no-print">
  <Link
    to="/"
    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
  >
    Retour à l’accueil
  </Link>
  <button
    onClick={() => window.print()}
    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
  >
    🧾 Imprimer la facture
  </button>
</div>

    </section>
  );
}
