import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaQuestionCircle, FaTimes, FaBars } from "react-icons/fa";
import HelpModal from "./HelpModal";
import "./Navbar.css"; // ✅ Import du style séparé

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">
            <Link to="/">Easy Shop</Link>
          </h1>

          {/* Menu Burger (mobile) */}
          <div className="burger-menu">
            <button onClick={() => setMenuOpen(!menuOpen)} className="burger-button">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Menu standard (desktop) */}
          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/produits">Produits</Link></li>

            {!user ? (
              <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
            ) : (
              <li>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="logout-button">
                  Déconnexion
                </button>
              </li>
            )}

            <li className="cart-icon">
              <Link to="/panier">
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </li>

            <li>
              <button onClick={() => setIsHelpOpen(true)} className="help-button">
                <FaQuestionCircle />
                Aide
              </button>
            </li>
            <li><Link to="/admin/produits">Admin Produits</Link></li>
          </ul>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <ul className="nav-links-mobile">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/produits" onClick={() => setMenuOpen(false)}>Produits</Link></li>
            {!user ? (
              <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
            ) : (
              <li>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="logout-button">
                  Déconnexion
                </button>
              </li>
            )}
            <li>
              <Link to="/panier" onClick={() => setMenuOpen(false)}>
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            </li>
            <li>
              <button onClick={() => { setIsHelpOpen(true); setMenuOpen(false); }} className="help-button">
                <FaQuestionCircle />
                Aide
              </button>
            </li>
            <li><Link to="/admin/produits" onClick={() => setMenuOpen(false)}>Admin Produits</Link></li>
          </ul>
        )}
      </nav>

      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </>
  );
}
