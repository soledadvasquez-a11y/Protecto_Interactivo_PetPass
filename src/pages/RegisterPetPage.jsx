import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';
import DecorativeConfetti from '../components/decorative/DecorativeConfetti.jsx';

import './RegisterPetPage.css';

function RegisterPetPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
  });

  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setError('');
  };

  const handleSavePet = () => {
    if (
      !formData.name.trim() ||
      !formData.species.trim()
    ) {
      setError(
        'Ingresa al menos el nombre y la especie.'
      );
      return;
    }

    /*
      GUARDADO PROVISIONAL:
      el registro real irá al backend después.
    */

    navigate('/home');
  };

  return (
    <main className="register-pet-page">
      <DecorativeConfetti />

      <section className="register-pet-page__content">
        <button
          type="button"
          className="register-pet-page__back"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        <header className="register-pet-page__heading">
          <h1>Registra tu mascota</h1>

          <p>
            Completa su información para crear su
            identidad digital en PetPass.
          </p>
        </header>

        <div className="register-pet-page__avatar">
          <span aria-hidden="true">🐾</span>

          <p>
            fotografía 
          </p>
        </div>

        <div className="register-pet-page__form">
          <FormField
            label="Nombre"
            type="text"
            value={formData.name}
            placeholder="Nombre de tu mascota"
            onChange={handleChange('name')}
          />

          <FormField
            label="Especie"
            type="text"
            value={formData.species}
            placeholder="Ej. Perro"
            onChange={handleChange('species')}
          />

          <FormField
            label="Raza"
            type="text"
            value={formData.breed}
            placeholder="Ej. Pug"
            onChange={handleChange('breed')}
          />

          <FormField
            label="Edad"
            type="text"
            value={formData.age}
            placeholder="Ej. 5 años"
            onChange={handleChange('age')}
          />

          {error && (
            <p
              className="register-pet-page__error"
              role="alert"
            >
              {error}
            </p>
          )}

          <Button
            variant="primary"
            onClick={handleSavePet}
          >
            Guardar mascota
          </Button>
        </div>
      </section>
    </main>
  );
}

export default RegisterPetPage;