import React, { useEffect, useState } from "react";

export default function AdminProduits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour le formulaire d'ajout/modification
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Chargement des produits au montage
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Erreur lors du chargement des produits");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    console.log("ID à supprimer:", id);
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      // Rafraîchir liste produits
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  // Préparer modification produit
  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  // Annuler modification
  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", image: "" });
  };

  // Soumettre ajout ou modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct ? `/api/products/${editingProduct}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

      // Réinitialiser form et recharger produits
      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", image: "" });
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p className="text-red-600">Erreur: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Gestion des produits</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nom"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 rounded w-full"
          rows={3}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Prix"
          required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="URL image"
          required
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {editingProduct ? "Modifier" : "Ajouter"} produit
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-purple-100">
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Prix (€)</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td className="border border-gray-300 p-2">{prod.name}</td>
              <td className="border border-gray-300 p-2">{prod.description}</td>
              <td className="border border-gray-300 p-2">{prod.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <img src={prod.image} alt={prod.name} className="h-16 object-contain" />
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
