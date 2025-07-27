// src/data/productsData.js
const products = [
  // --- MODE ---
  { id: 1, name: "Robe élégante", price: 49, image: "/images/robe.jpg", category: "Mode", description: "Robe chic pour toutes vos occasions." },
  { id: 2, name: "Chemise homme classique", price: 39, image: "/images/chemise6.jpg", category: "Mode", description: "Chemise confortable et élégante pour homme." },
  { id: 3, name: "Haut femme fleuri", price: 25, image: "/images/hautjpg", category: "Mode", description: "Haut tendance parfait pour l’été." },
  { id: 4, name: "Lingerie femme dentelle", price: 29, image: "/images/lingerie.jpg", category: "Mode", description: "Ensemble en dentelle séduisant et confortable." },
  { id: 5, name: "Chaussures homme cuir", price: 59, image: "/images/chaussureH.jpg", category: "Chaussures", description: "Élégantes chaussures en cuir pour homme." },
  { id: 6, name: "Chaussures à talon rouge", price: 65, image: "/images/chaus-D1.jpg", category: "Chaussures", description: "Talons aiguilles pour un look glamour." },
  { id: 7, name: "Baskets de sport", price: 70, image: "/images/basket.jpg", category: "Chaussures", description: "Confort et performance pour le sport." },
  { id: 8, name: "Perruque naturelle longue", price: 89, image: "/images/perruque2.jpg", category: "Beauté", description: "Perruque naturelle avec effet lisse et brillant." },

  // --- BEAUTE & ACCESSOIRES ---
  { id: 9, name: "Bracelet doré", price: 19, image: "/images/bracelet3.jpg", category: "Accessoires", description: "Bracelet chic et élégant pour toutes vos tenues." },
  { id: 10, name: "Montre en acier femme", price: 49, image: "/images/montre.jpg", category: "Accessoires", description: "Montre tendance avec bracelet acier inoxydable." },
  { id: 11, name: "Lunettes de soleil", price: 35, image: "/images/lunette3.jpg", category: "Accessoires", description: "Protection UV et style pour vos sorties." },
  { id: 12, name: "Trousse de maquillage complète", price: 55, image: "/images/maquillage.jpg", category: "Beauté", description: "Palette complète pour sublimer votre beauté." },
  { id: 13, name: "Crème hydratante visage", price: 22, image: "/images/creme.jpg", category: "Beauté", description: "Hydratation intense pour tous types de peau." },
  { id: 14, name: "Parfum floral 100ml", price: 59, image: "/images/parfum8.jpg", category: "Beauté", description: "Fragrance douce et envoûtante." },

  // --- CUISINE ---
  { id: 15, name: "Ustensiles de cuisine inox", price: 40, image: "/images/IMG-20250508-WA0073.jpg", category: "Cuisine", description: "Ensemble complet d’ustensiles de qualité." },
  { id: 16, name: "Tasses à café en céramique", price: 25, image: "/images/IMG-20250508-WA0071.jpg", category: "Cuisine", description: "Set de 6 tasses élégantes pour vos cafés." },
  { id: 17, name: "Service de vaisselle 18 pièces", price: 75, image: "/images/IMG-20250508-WA0076.jpg", category: "Cuisine", description: "Parfait pour vos repas en famille." },
  { id: 18, name: "Micro-ondes 800W", price: 129, image: "/images/micro-onde.jpg", category: "Électroménager", description: "Pratique et rapide pour vos repas." },
  { id: 19, name: "Cuisinière 4 feux à gaz", price: 299, image: "/images/IMG-20250508-WA0068.jpg", category: "Électroménager", description: "Cuisinière robuste et fiable." },
  { id: 20, name: "Machine à laver 7kg", price: 399, image: "/images/machine-à-laver2.jpg", category: "Électroménager", description: "Silencieuse et efficace pour toute la famille." },
  { id: 21, name: "Fer à repasser vapeur", price: 49, image: "/images/IMG-20250508-WA0063.jpg", category: "Électroménager", description: "Repassage facile et rapide." },

  // --- MAISON & DECO ---
  { id: 22, name: "Tableau moderne 3 pièces", price: 39, image: "/images/tableau.jpg", category: "Maison", description: "Décorez votre salon avec élégance." },
  { id: 23, name: "Meuble TV moderne", price: 120, image: "/images/salon5.jpg", category: "Maison", description: "Support élégant pour votre télévision." },
  { id: 24, name: "Meuble cuisine suspendu", price: 140, image: "/images/IMG-20250508-WA0103.jpg", category: "Maison", description: "Optimisez votre espace de rangement." },
  { id: 25, name: "Chambre à coucher complète", price: 799, image: "/images/IMG-20250508-WA0106.jpg", category: "Maison", description: "Confort et élégance pour vos nuits." },

  // --- TECH ---
  { id: 26, name: "Téléphone Android 128GB", price: 199, image: "/images/IMG-20250508-WA0091.jpg", category: "Électronique", description: "Performant et design moderne." },
  { id: 27, name: "Imprimante multifonction", price: 89, image: "/images/IMG-20250508-WA0058.jpg", category: "Électronique", description: "Scanner + impression rapide." },
  { id: 28, name: "Casque Bluetooth", price: 69, image: "/images/casque.jpg", category: "Électronique", description: "Autonomie et son HD immersif." },
  { id: 29, name: "Montre connectée", price: 129, image: "/images/montre-connect.jpg", category: "Électronique", description: "Suivi santé, notifications, appels." },
  { id: 30, name: "Tablette 10 pouces", price: 179, image: "/images/IMG-20250508-WA0090.jpg", category: "Électronique", description: "Idéale pour vidéos, jeux, lecture." },

   // --- PRODUITS SUPPLÉMENTAIRES ---
  ...Array.from({ length: 53 }, (_, i) => ({
    id: 28 + i,
    name: `Produit ${i + 1}`,
    price: 20 + (i % 50),
    image: `/images/produit${i + 1}.jpg`, // Tu peux copier tes images comme produit1.jpg, produit2.jpg, etc.
    category: i % 2 === 0 ? "Divers" : "Maison",
    description: `Description du produit ${i + 1} à compléter.`
  }))
];

export default products;
