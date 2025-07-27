// src/pages/ProductGallery.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/productsData";
import { CartContext } from "../context/CartContext"; // Assure-toi que ce context existe

export default function ProductGallery() {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tous");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "Tous" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Tous les produits</h2>

      {/* Barre de recherche + filtre */}
      <div className="flex flex-col sm:flex-row justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="Tous">Tous</option>
          <option value="Accessoires">Accessoires</option>
          <option value="Chaussures">Chaussures</option>
          <option value="Électronique">Électronique</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">Aucun produit trouvé.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded p-4 shadow flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded shadow hover:scale-105 transition-transform duration-300"
              />
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-purple-600 font-bold mb-3">{product.price} €</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
              >
                Ajouter au panier
              </button>
              <Link
                to={`/produits/${product.id}`}
                className="mt-2 text-purple-700 hover:underline"
              >
                Voir détails
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
