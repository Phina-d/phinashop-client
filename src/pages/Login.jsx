import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL; // ✅ backend dynamique

  useEffect(() => {
    localStorage.removeItem("token"); // Nettoyage si retour manuel
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await login(data.token);

            // ✅ Décoder le token pour récupérer le rôle
        const decoded = jwtDecode(data.token);

             // 🔹 Redirection selon rôle
        switch (decoded.role) {
          case "admin":
            navigate("/dashboard/admin");
            break;
          case "closer":
            navigate("/dashboard/closer");
            break;
          case "chef":
          case "chef_service": // si c'est le rôle du chef dans ton token
            navigate("/dashboard/chef");
            break;
          case "client":
            navigate("/dashboard/client");
            break;
          default:
            navigate("/"); // fallback
        }

      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      alert("Erreur serveur, réessayez plus tard");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Connexion
        </h2>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="exemple@domain.com"
        />
        <label className="block mb-2 font-semibold text-gray-700">Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Se connecter
        </button>
        <p className="mt-4 text-center text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Créez-en un
          </Link>
        </p>
      </form>
    </div>
  );
}
