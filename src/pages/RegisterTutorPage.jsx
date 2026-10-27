import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';
import DecorativeConfetti from '../components/decorative/DecorativeConfetti.jsx';

import './RegisterTutorPage.css';

function RegisterTutorPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setError('');
  };

  const handleRegister = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        'Completa los campos obligatorios.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        'Las contraseñas no coinciden.'
      );
      return;
    }

    /*
      REGISTRO PROVISIONAL:
      la creación real del tutor se conectará
      posteriormente al backend.
    */

    navigate('/mascotas/nueva');
  };

  return (
    <main className="register-tutor-page">
      <DecorativeConfetti />

      <section className="register-tutor-page__content">
        <button
          type="button"
          className="register-tutor-page__back"
          onClick={() => navigate('/login')}
        >
          ← Volver
        </button>

        <header className="register-tutor-page__heading">
          <span className="register-tutor-page__brand">
            PetPass
          </span>

          <h1>Crea tu cuenta</h1>

          <p>
            Registra tus datos para comenzar a
            cuidar a tus mascotas con PetPass.
          </p>
        </header>

        <div className="register-tutor-page__form">
          <FormField
            label="Nombre completo"
            type="text"
            value={formData.name}
            placeholder="Tu nombre"
            onChange={handleChange('name')}
          />

          <FormField
            label="Correo electrónico"
            type="email"
            value={formData.email}
            placeholder="correo@ejemplo.com"
            onChange={handleChange('email')}
          />

          <FormField
            label="Teléfono"
            type="text"
            value={formData.phone}
            placeholder="Ej. 70000000"
            onChange={handleChange('phone')}
          />

          <FormField
            label="Contraseña"
            type="password"
            value={formData.password}
            placeholder="Crea una contraseña"
            onChange={handleChange('password')}
          />

          <FormField
            label="Confirmar contraseña"
            type="password"
            value={formData.confirmPassword}
            placeholder="Repite tu contraseña"
            onChange={handleChange(
              'confirmPassword'
            )}
          />

          {error && (
            <p
              className="register-tutor-page__error"
              role="alert"
            >
              {error}
            </p>
          )}

          <Button
            variant="primary"
            onClick={handleRegister}
          >
            Crear cuenta
          </Button>

          <button
            type="button"
            className="register-tutor-page__login"
            onClick={() => navigate('/login')}
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </div>
      </section>
    </main>
  );
}

export default RegisterTutorPage;
