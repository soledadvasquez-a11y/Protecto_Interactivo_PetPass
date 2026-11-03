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

    /*
      Si cambia de mascota mientras editaba,
      cerramos el modo edición.
    */
    setIsEditingPet(false);
    setEditFormData(EMPTY_EDIT_FORM);
  };

  const handleOpenEdit = () => {
    if (!selectedPet) {
      return;
    }

    /*
      Copiamos los datos actuales de la mascota
      hacia el formulario.
    */
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

    /*
      App.jsx recibirá este callback en Fase 5.
    */
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

    /*
      App.jsx eliminará realmente la mascota
      en Fase 5.
    */
    if (onDeletePet) {
      onDeletePet(selectedPet.id);
    }

    setDeleteModalOpen(false);
    setIsEditingPet(false);
  };

  if (!selectedPet) {
    return (
      <main className="page pets-page">
        <header className="pets-page__heading">
          <div>
            <h1>Mis Mascotas</h1>

            <p>
              Todavía no tienes mascotas registradas.
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
      </main>
    );
  }

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
        <h2>Información</h2>

        {!isEditingPet ? (
          <>
            <PetCard
              variant="detailed"
              name={selectedPet.name}
              photo={selectedPet.photo}
              species={selectedPet.species}
              breed={selectedPet.breed}
              age={selectedPet.age}
              onQrClick={() =>
                navigate(
                  `/mascotas/${selectedPet.id}/carnet`
                )
              }
              onEdit={handleOpenEdit}
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
        ) : (
          <div className="pets-page__edit-panel">
            <h3>Editar mascota</h3>

            <FormField
              label="Nombre"
              type="text"
              value={editFormData.name}
              onChange={handleEditChange('name')}
            />

            <FormField
              label="Especie"
              type="text"
              value={editFormData.species}
              onChange={handleEditChange(
                'species'
              )}
            />

            <FormField
              label="Raza"
              type="text"
              value={editFormData.breed}
              onChange={handleEditChange('breed')}
            />

            <FormField
              label="Edad"
              type="text"
              value={editFormData.age}
              onChange={handleEditChange('age')}
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
    </main>
  );
}

export default PetsPage;