import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import ProductGallery from "./pages/ProductGallery";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import AdminProduits from "./pages/AdminProduits";
import ScrollToTopButton from "./components/ScrollToTopButton";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produits" element={<ProductGallery />} />
            <Route path="/produits/:id" element={<ProductDetails />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/produits" element={<AdminProduits />} />
          </Routes>
        </main>
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  );
}
