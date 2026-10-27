import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetSelector from '../components/PetSelector/PetSelector.jsx';
import PetCard from '../components/PetCard/PetCard.jsx';
import Button from '../components/Button/Button.jsx';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal.jsx';

import './PetsPage.css';

const pets = [
  {
    id: 1,
    name: 'Toby',
    species: 'Perro',
    breed: 'Pug',
    age: '5 años',
  },
  {
    id: 2,
    name: 'Mila',
    species: 'Gato',
    breed: 'Mestiza',
    age: '3 años',
  },
];

function PetsPage() {
  const navigate = useNavigate();

  const [selectedPetId, setSelectedPetId] =
    useState(1);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const selectedPet =
    pets.find(
      (pet) => pet.id === selectedPetId
    ) ?? pets[0];

  const handleDelete = () => {
    /*
      Eliminación visual/provisional.
      El backend manejará el borrado real.
    */

    setDeleteModalOpen(false);

    alert(
      `La eliminación real de ${selectedPet.name} se conectará al backend.`
    );
  };

  return (
    <main className="page pets-page">
      <header className="pets-page__heading">
        <div>
          <h1>Mis Mascotas</h1>

          <p>
            Selecciona una mascota para ver o
            administrar su información.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() =>
            navigate('/mascotas/nueva')
          }
        >
          Agregar mascota
        </Button>
      </header>

      <section className="pets-page__selector-section">
        <h2>Seleccionar mascota</h2>

        <div className="pets-page__selectors">
          {pets.map((pet) => (
            <PetSelector
              key={pet.id}
              name={pet.name}
              state={
                selectedPetId === pet.id
                  ? 'selected'
                  : 'default'
              }
              onClick={() =>
                setSelectedPetId(pet.id)
              }
            />
          ))}

          <PetSelector
            name="Agregar"
            state="add"
            onClick={() =>
              navigate('/mascotas/nueva')
            }
          />
        </div>
      </section>

      <section className="pets-page__detail">
        <h2>Información</h2>

        <PetCard
          variant="detailed"
          name={selectedPet.name}
          species={selectedPet.species}
          breed={selectedPet.breed}
          age={selectedPet.age}
        />

        <div className="pets-page__actions">
          <Button
            variant="primary"
            onClick={() =>
              navigate(
                `/mascotas/${selectedPet.id}/carnet`
              )
            }
          >
            Ver carnet digital
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                `/mascotas/${selectedPet.id}/historial-medico`
              )
            }
          >
            Historial médico
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              setDeleteModalOpen(true)
            }
          >
            Eliminar mascota
          </Button>
        </div>
      </section>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        variant="danger"
        title="Eliminar mascota"
        message={`¿Seguro que deseas eliminar a ${selectedPet.name}?`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
        onCancel={() =>
          setDeleteModalOpen(false)
        }
      />
    </main>
  );
}

export default PetsPage;