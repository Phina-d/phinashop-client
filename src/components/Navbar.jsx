import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaQuestionCircle, FaTimes, FaBars } from "react-icons/fa";
import HelpModal from "./HelpModal";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-purple-700 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">
            <Link to="/">EasyShop</Link>
          </h1>

          {/* Menu Burger (mobile) */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Menu standard (desktop) */}
          <ul className="hidden lg:flex gap-6 items-center">
            <li><Link to="/" className="hover:underline">Accueil</Link></li>
            <li><Link to="/produits" className="hover:underline">Produits</Link></li>

            {!user ? (
              <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-transparent border-none cursor-pointer hover:underline"
                >
                  Déconnexion
                </button>
              </li>
            )}

            <li className="relative">
              <Link to="/panier">
                <FaShoppingCart className="text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <button
                onClick={() => setIsHelpOpen(true)}
                className="flex items-center gap-1 hover:underline"
              >
                <FaQuestionCircle className="text-xl" />
                Aide
              </button>
            </li>
            <li>
    <Link to="/admin/produits" className="hover:underline">
      Admin Produits
    </Link>
  </li>
          </ul>
        </div>

        {/* Menu mobile déroulant */}
        {menuOpen && (
          <ul className="flex flex-col gap-4 mt-4 lg:hidden">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/produits" onClick={() => setMenuOpen(false)}>Produits</Link></li>
            
            {!user ? (
              <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-transparent border-none cursor-pointer"
                >
                  Déconnexion
                </button>
              </li>
            )}

            <li className="relative">
              <Link to="/panier" onClick={() => setMenuOpen(false)}>
                <FaShoppingCart className="text-xl inline" />
                {totalItems > 0 && (
                  <span className="ml-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 inline-flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <button
                onClick={() => {
                  setIsHelpOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1"
              >
                <FaQuestionCircle className="text-xl" />
                Aide
              </button>
            </li>
            <li>
      <Link to="/admin/produits" onClick={() => setMenuOpen(false)}>
        Admin Produits
      </Link>
    </li>
          </ul>
        )}
      </nav>

      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </>
  );
}
