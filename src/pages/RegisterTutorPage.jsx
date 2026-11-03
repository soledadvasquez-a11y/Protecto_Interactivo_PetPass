import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';

import './RegisterTutorPage.css';

function RegisterTutorPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    // Cumple 3.3: Navega directamente a /home
    navigate('/home');
  };

  return (
    <main className="register-tutor-page">
      <div className="register-tutor-page__content">
        <button
          type="button"
          className="register-tutor-page__back"
          onClick={() => navigate('/login')}
        >
          ← Volver
        </button>

        <header className="register-tutor-page__heading">
          <span className="register-tutor-page__brand">PetPass</span>
          <h1>Registro de Tutor</h1>
          <p>Crea tu cuenta para gestionar la vida de tu mascota</p>
        </header>

        <form onSubmit={handleSubmit} className="register-tutor-page__form">
          <FormField
            label="Nombre Completo"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="Ej. Ana Pérez"
          />

          <FormField
            label="Correo Electrónico"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="ejemplo@correo.com"
          />

          <FormField
            label="Teléfono / WhatsApp"
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder="+591 ..."
          />

          <FormField
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="••••••••"
          />

          {/* Condicional Fase 4: Mensaje de error de registro */}
          {error && (
            <p className="register-tutor-page__error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary">
            Registrarme
          </Button>

          <button
            type="button"
            className="register-tutor-page__login"
            onClick={() => navigate('/login')}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterTutorPage;