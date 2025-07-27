import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ pour redirection
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ hook de navigation

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
    } else {
      navigate("/checkout"); // ✅ redirige vers la page de commande
    }
  };

  if (cart.length === 0) return <p className="p-6 text-center">Votre panier est vide.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Votre Panier</h2>

      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Produit</th>
            <th className="text-left p-2">Prix Unitaire</th>
            <th className="text-left p-2">Quantité</th>
            <th className="text-left p-2">Sous-total</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id} className="border-b">
              <td className="p-2 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                {item.name}
              </td>
              <td className="p-2">{item.price} €</td>
              <td className="p-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => {
                    const newQty = parseInt(e.target.value);
                    if (!isNaN(newQty) && newQty > 0) {
                      updateQuantity(item.id, newQty);
                    }
                  }}
                  className="w-16 border rounded px-2 py-1"
                />
              </td>
              <td className="p-2">{(item.price * item.quantity).toFixed(2)} €</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-right text-xl font-bold">Total : {total.toFixed(2)} €</h3>

      <div className="text-right mt-6 space-x-2">
        <button
          onClick={clearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Vider le panier
        </button>

        <Link
  to="/checkout"
  className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
>
  Passer la commande
</Link>

      </div>
    </section>
  );
}
