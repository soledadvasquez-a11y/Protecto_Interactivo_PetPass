import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetSelector from '../components/PetSelector/PetSelector.jsx';
import PetCard from '../components/PetCard/PetCard.jsx';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal.jsx';

import './PetsPage.css';

const EMPTY_EDIT_FORM = {
  name: '',
  species: '',
  breed: '',
  age: '',
};

function PetsPage() {
  const navigate = useNavigate();

  // Datos que ahora pertenecen a esta página
  const [pets, setPets] = useState([]);

  // Estados de la API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [saving, setSaving] = useState(false);

  // Estados de interacción
  const [selectedPetId, setSelectedPetId] =
    useState(null);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [isEditingPet, setIsEditingPet] =
    useState(false);

  const [editFormData, setEditFormData] =
    useState(EMPTY_EDIT_FORM);

  // GET /api/mascotas
  useEffect(() => {
    async function loadPets() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/mascotas');

        const data = await response.json();

        if (response.ok) {
          setPets(data);
        } else {
          setError(
            data.error ||
              'No se pudieron cargar las mascotas.'
          );
        }
      } catch {
        setError(
          'No se pudo conectar con la API. ¿Está encendida?'
        );
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, []);

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
    setActionError('');
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

    setActionError('');
    setIsEditingPet(true);
  };

  const handleEditChange =
    (field) => (event) => {
      setEditFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      setActionError('');
    };

  const handleCancelEdit = () => {
    setIsEditingPet(false);
    setEditFormData(EMPTY_EDIT_FORM);
    setActionError('');
  };

  // PUT /api/mascotas/:id
  const handleSaveEdit = async () => {
    if (!selectedPet) {
      return;
    }

    if (
      !editFormData.name.trim() ||
      !editFormData.species.trim()
    ) {
      setActionError(
        'El nombre y la especie son obligatorios.'
      );
      return;
    }

    const payload = {
      ...selectedPet,

      name: editFormData.name.trim(),
      species: editFormData.species.trim(),
      breed: editFormData.breed.trim(),
      age: editFormData.age.trim(),
    };

    setSaving(true);
    setActionError('');

    try {
      const response = await fetch(
        `/api/mascotas/${selectedPet.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setActionError(
          data.error ||
            'No se pudo actualizar la mascota.'
        );
        return;
      }

      setPets((currentPets) =>
        currentPets.map((pet) =>
          pet.id === data.id
            ? data
            : pet
        )
      );

      setIsEditingPet(false);
      setEditFormData(EMPTY_EDIT_FORM);
    } catch {
      setActionError(
        'No se pudo conectar con la API. ¿Está encendida?'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleOpenDelete = () => {
    if (!selectedPet) {
      return;
    }

    setActionError('');
    setDeleteModalOpen(true);
  };

  // DELETE /api/mascotas/:id
  const handleDelete = async () => {
    if (!selectedPet) {
      return;
    }

    setSaving(true);
    setActionError('');

    try {
      const response = await fetch(
        `/api/mascotas/${selectedPet.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const data = await response.json();

        setActionError(
          data.error ||
            'No se pudo eliminar la mascota.'
        );

        return;
      }

      const remainingPets = pets.filter(
        (pet) => pet.id !== selectedPet.id
      );

      setPets(remainingPets);

      setSelectedPetId(
        remainingPets[0]?.id ?? null
      );

      setDeleteModalOpen(false);
      setIsEditingPet(false);
      setEditFormData(EMPTY_EDIT_FORM);
    } catch {
      setActionError(
        'No se pudo conectar con la API. ¿Está encendida?'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page pets-page">
      <header className="pets-page__heading">
        <h1>Mis Mascotas</h1>
      </header>

      {loading && (
        <section className="pets-page__empty">
          <div
            className="pets-page__empty-icon"
            aria-hidden="true"
          >
            🐾
          </div>

          <h2>Cargando…</h2>

          <p>
            Buscando tus mascotas en PetPass.
          </p>
        </section>
      )}

      {!loading && error && (
        <section
          className="pets-page__empty"
          role="alert"
        >
          <div
            className="pets-page__empty-icon"
            aria-hidden="true"
          >
            ⚠️
          </div>

          <h2>No se pudo cargar</h2>

          <p>{error}</p>
        </section>
      )}

      {!loading &&
        !error &&
        actionError && (
          <p role="alert">
            {actionError}
          </p>
        )}

      {!loading &&
        !error &&
        pets.length === 0 && (
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
        )}

      {!loading &&
        !error &&
        pets.length > 0 && (
          <>
            <section className="pets-page__selector-section">
              <h2>Seleccionar mascota</h2>

              <div className="pets-page__selectors">
                {pets.map((pet) => (
                  <PetSelector
                    key={pet.id}
                    name={pet.name}
                    photo={pet.photo}
                    variant={
                      selectedPet?.id === pet.id
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

              {isEditingPet ? (
                <div className="pets-page__edit-panel">
                  <h3>Editar mascota</h3>

                  <FormField
                    label="Nombre"
                    type="text"
                    value={editFormData.name}
                    onChange={handleEditChange(
                      'name'
                    )}
                  />

                  <FormField
                    label="Especie"
                    type="text"
                    value={
                      editFormData.species
                    }
                    onChange={handleEditChange(
                      'species'
                    )}
                  />

                  <FormField
                    label="Raza"
                    type="text"
                    value={editFormData.breed}
                    onChange={handleEditChange(
                      'breed'
                    )}
                  />

                  <FormField
                    label="Edad"
                    type="text"
                    value={editFormData.age}
                    onChange={handleEditChange(
                      'age'
                    )}
                  />

                  <div className="pets-page__edit-actions">
                    <Button
                      variant="primary"
                      disabled={saving}
                      onClick={handleSaveEdit}
                    >
                      {saving
                        ? 'Guardando…'
                        : 'Guardar cambios'}
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
                    species={
                      selectedPet.species
                    }
                    breed={selectedPet.breed}
                    age={selectedPet.age}
                    onEdit={handleOpenEdit}
                    onQrClick={() =>
                      navigate(
                        `/mascotas/${selectedPet.id}/carnet`
                      )
                    }
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
              message={`¿Seguro que deseas eliminar a ${selectedPet?.name}?`}
              confirmLabel={
                saving
                  ? 'Eliminando…'
                  : 'Eliminar'
              }
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