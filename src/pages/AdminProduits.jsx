import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export default function AdminProduits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(token);
        setProducts(data);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData, token);
      } else {
        await createProduct(formData, token);
      }
      setFormData({ name: "", price: "", description: "", image: "" });
      setEditingProduct(null);
      // recharge la liste après modif/ajout
      const data = await getAllProducts(token);
      setProducts(data);
      setError(null);
    } catch {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await deleteProduct(id, token);
      const data = await getAllProducts(token);
      setProducts(data);
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des Produits</h2>

      <form onSubmit={handleSubmit} className="space-y-3 bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="URL Image"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingProduct ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      <hr className="my-6" />

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {products.map((product) => (
    <div key={product._id} className="border p-4 rounded shadow text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-80 h-80 object-cover rounded mx-auto mb-2"
      />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-semibold mt-1">{product.price} FCFA</p>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => handleEdit(product)}
          className="bg-yellow-400 px-3 py-1 rounded"
        >
          Modifier
        </button>
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Supprimer
        </button>
      </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
