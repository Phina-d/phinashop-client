// src/components/MotivationSection.jsx
import React from 'react';

export default function MotivationSection() {
  return (
    <section className="bg-purple-50 text-center py-12 px-4">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-4">
        Donnez à votre boutique un nouveau style
      </h2>
      <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
        "Le succès n'est pas final. L'échec n'est pas fatal.
        C'est le courage de continuer qui compte."
      </p>
      <p className="text-md text-gray-600 mt-4">
        Le succès est la capacité d'aller d'échec en échec sans perdre son enthousiasme.
      </p>
    </section>
  );
}
