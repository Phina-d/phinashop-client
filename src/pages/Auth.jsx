import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simule un token pour test, en vrai tu appelleras backend et récupèreras token
    const fakeToken = "token123456";
    login(fakeToken);
    navigate("/"); // redirige vers accueil après login
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    // Simule un token comme si l'inscription était réussie
    const fakeToken = "token123456";
    login(fakeToken);
    navigate("/"); // redirige vers accueil après inscription
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h2>

      {isLogin ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Se connecter
          </button>
          <p className="text-center text-sm">
            Pas encore inscrit ?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-purple-600 underline"
            >
              Créer un compte
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            S'inscrire
          </button>
          <p className="text-center text-sm">
            Déjà un compte ?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-purple-600 underline"
            >
              Se connecter
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
