import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Liens */}
        <div>
          <h3 className="font-bold mb-4">Informations</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/shipping" className="hover:underline">Livraison</a></li>
            <li><a href="/returns" className="hover:underline">Retours</a></li>
            <li><a href="/terms" className="hover:underline">CGV</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-2">Recevez nos offres exclusives et nouveautés !</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="px-3 py-2 rounded-l bg-white text-purple-800 focus:outline-none"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-r font-semibold hover:bg-yellow-500 transition">
              S'inscrire
            </button>
          </form>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="font-bold mb-4">Suivez-nous</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-yellow-400">Facebook</a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-yellow-400">Instagram</a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-yellow-400">Twitter</a>
          </div>
        </div>

     {/* Paiements & Garantie */}
<div className="text-gray-800">
  <h3 className="font-bold mb-4">Paiement sécurisé</h3>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm">
    <span className="flex items-center gap-2">
      <FaCcVisa className="text-xl text-blue-600" />
      Visa
    </span>
    <span className="flex items-center gap-2">
      <FaCcMastercard className="text-xl text-red-600" />
      Mastercard
    </span>
    <span className="flex items-center gap-2">
      <FaCcPaypal className="text-xl text-indigo-600" />
      PayPal
    </span>
  </div>
  <p className="text-sm italic mt-3">Livraison rapide & gratuite dès 50€</p>
</div>


      </div>
      <div className="text-center text-xs mt-8 opacity-70">
        © 2025 EasyShop - Tous droits réservés
      </div>
    </footer>
  );
}
