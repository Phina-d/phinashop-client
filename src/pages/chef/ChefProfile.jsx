import React, { useState } from "react";

export default function ChefProfile() {
  const initialChef = {
    nom: "Jacques Dubois",
    poste: "Chef de Service",
    email: "chef.dubois@example.com",
    telephone: "+221 77 123 45 67",
    dateEntree: "2019-03-12",
    photo: "https://i.pravatar.cc/200?img=12",
    nbProjets: 14,
    nbEmployes: 8,
  };

  const [chef, setChef] = useState(initialChef);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChef((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Profil enregistré !");
    setEditMode(false);
  };

  const handleCancel = () => {
    setChef(initialChef);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center">
          <img
            src={chef.photo}
            alt={chef.nom}
            className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-md object-cover"
          />

          {!editMode ? (
            <>
              <h1 className="text-3xl font-bold mt-4 text-gray-800">{chef.nom}</h1>
              <p className="text-purple-600 font-semibold">{chef.poste}</p>

              <div className="mt-6 space-y-2 text-gray-700 w-full">
                <p><strong>Email :</strong> {chef.email}</p>
                <p><strong>Téléphone :</strong> {chef.telephone}</p>
                <p><strong>Date d’entrée :</strong> {new Date(chef.dateEntree).toLocaleDateString()}</p>
              </div>

              <div className="flex justify-around w-full mt-6 text-center text-gray-600">
                <div>
                  <p className="text-xl font-bold">{chef.nbProjets}</p>
                  <p>Projets</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{chef.nbEmployes}</p>
                  <p>Employés</p>
                </div>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full shadow-md transition duration-300"
              >
                Modifier le profil
              </button>
            </>
          ) : (
            <>
              <form
                className="mt-6 w-full space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div>
                  <label className="block font-semibold mb-1" htmlFor="nom">Nom</label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={chef.nom}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1" htmlFor="poste">Poste</label>
                  <input
                    id="poste"
                    name="poste"
                    type="text"
                    value={chef.poste}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={chef.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1" htmlFor="telephone">Téléphone</label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={chef.telephone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1" htmlFor="dateEntree">Date d’entrée</label>
                  <input
                    id="dateEntree"
                    name="dateEntree"
                    type="date"
                    value={chef.dateEntree}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
