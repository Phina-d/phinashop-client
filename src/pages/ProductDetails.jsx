// src/pages/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/productsData";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-gray-500 mt-10">Produit introuvable.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={product.image}
          alt={product.name}
           className="max-w-md max-h-[400px] rounded shadow-lg object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-purple-600 text-xl font-semibold">{product.price} €</p>
          <p className="text-gray-700">
            Description : Produit de haute qualité, parfait pour toutes vos envies.
          </p>
          <p className="text-gray-500">Catégorie : {product.category}</p>
        </div>
      </div>
    </div>
  );
}
