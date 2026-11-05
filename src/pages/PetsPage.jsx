import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetSelector from '../components/PetSelector/PetSelector.jsx';
import PetCard from '../components/PetCard/PetCard.jsx';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal.jsx';

import initialPets from '../data/pets.js';

import './PetsPage.css';

const EMPTY_EDIT_FORM = {
  name: '',
  species: '',
  breed: '',
  age: '',
};

function PetsPage({
  pets = initialPets,
  onUpdatePet,
  onDeletePet,
}) {
  const navigate = useNavigate();

  const [selectedPetId, setSelectedPetId] =
    useState(pets[0]?.id ?? null);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [isEditingPet, setIsEditingPet] =
    useState(false);

  const [editFormData, setEditFormData] =
    useState(EMPTY_EDIT_FORM);

  const selectedPet =
    pets.find(
      (pet) => pet.id === selectedPetId
    ) ??
    pets[0] ??
    null;

  const handleSelectPet = (petId) => {
    setSelectedPetId(petId);

    setIsEditingPet(false);
    setEditFormData(EMPTY_EDIT_FORM);
  };

  const handleOpenEdit = () => {
    if (!selectedPet) {
      return;
    }

    setEditFormData({
      name: selectedPet.name,
      species: selectedPet.species,
      breed: selectedPet.breed,
      age: selectedPet.age,
    });

    setIsEditingPet(true);
  };

  const handleEditChange =
    (field) => (event) => {
      setEditFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleCancelEdit = () => {
    setIsEditingPet(false);
    setEditFormData(EMPTY_EDIT_FORM);
  };

  const handleSaveEdit = () => {
    if (!selectedPet) {
      return;
    }

    const updatedPet = {
      ...selectedPet,
      name: editFormData.name.trim(),
      species: editFormData.species.trim(),
      breed: editFormData.breed.trim(),
      age: editFormData.age.trim(),
    };

    if (onUpdatePet) {
      onUpdatePet(updatedPet);
    }

    setIsEditingPet(false);
    setEditFormData(EMPTY_EDIT_FORM);
  };

  const handleOpenDelete = () => {
    if (!selectedPet) {
      return;
    }

    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedPet) {
      return;
    }

    if (onDeletePet) {
      onDeletePet(selectedPet.id);
    }

    setDeleteModalOpen(false);
    setIsEditingPet(false);
  };

  return (
    <main className="page pets-page">

      <header className="pets-page__heading">

        <div>
          <h1>Mis Mascotas</h1>

          <p>
            Administra la información de tus mascotas.
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

      {pets.length === 0 ? (

        <section className="pets-page__empty">

          <div
            className="pets-page__empty-icon"
            aria-hidden="true"
          >
            🐾
          </div>

          <h2>
            Aún no tienes mascotas registradas
          </h2>

          <p>
            Cuando quieras puedes registrar una
            mascota y crear su identidad PetPass.
          </p>

          <Button
            variant="primary"
            onClick={() =>
              navigate('/mascotas/nueva')
            }
          >
            Registrar mascota
          </Button>

        </section>

      ) : (

        <>
          <section className="pets-page__selector-section">

            <h2>
              Seleccionar mascota
            </h2>

            <div className="pets-page__selectors">

              {pets.map((pet) => (
                <PetSelector
                  key={pet.id}
                  name={pet.name}
                  photo={pet.photo}
                  variant={
                    selectedPetId === pet.id
                      ? 'selected'
                      : 'default'
                  }
                  onClick={() =>
                    handleSelectPet(pet.id)
                  }
                />
              ))}

              <PetSelector
                name="Agregar"
                variant="add"
                onClick={() =>
                  navigate('/mascotas/nueva')
                }
              />

            </div>

          </section>

          <section className="pets-page__detail">

            <h2>
              Información
            </h2>

            {isEditingPet ? (

              <div className="pets-page__edit-panel">

                <h3>
                  Editar mascota
                </h3>

                <FormField
                  label="Nombre"
                  type="text"
                  value={editFormData.name}
                  onChange={
                    handleEditChange('name')
                  }
                />

                <FormField
                  label="Especie"
                  type="text"
                  value={editFormData.species}
                  onChange={
                    handleEditChange(
                      'species'
                    )
                  }
                />

                <FormField
                  label="Raza"
                  type="text"
                  value={editFormData.breed}
                  onChange={
                    handleEditChange('breed')
                  }
                />

                <FormField
                  label="Edad"
                  type="text"
                  value={editFormData.age}
                  onChange={
                    handleEditChange('age')
                  }
                />

                <div className="pets-page__edit-actions">

                  <Button
                    variant="primary"
                    onClick={handleSaveEdit}
                  >
                    Guardar cambios
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>

                </div>

              </div>

            ) : (

              <>
                <PetCard
                  variant="detailed"
                  name={selectedPet.name}
                  photo={selectedPet.photo}
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
                    variant="secondary"
                    onClick={handleOpenEdit}
                  >
                    Editar mascota
                  </Button>

                  <Button
                    variant="danger"
                    onClick={handleOpenDelete}
                  >
                    Eliminar mascota
                  </Button>

                </div>
              </>

            )}

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
        </>

      )}

    </main>
  );
}

export default PetsPage;