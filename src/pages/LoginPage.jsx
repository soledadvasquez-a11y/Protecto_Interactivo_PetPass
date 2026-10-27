import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';

import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleLogin = () => {
    /*
      Login provisional:
      la autenticación real se conectará al backend.
    */
    navigate('/home');
  };

  return (
    <main className="login-page">
      <section className="login-page__card">
        <div className="login-page__brand">
          <span className="login-page__brand-mark" aria-hidden="true">
            PetPass
          </span>

          <h1>Iniciar sesión</h1>

          <p>
            Ingresa tus datos para continuar.
          </p>
        </div>

        <div className="login-page__form">
          <FormField
            label="Correo electrónico"
            type="email"
            value={formData.email}
            placeholder="correo@ejemplo.com"
            onChange={handleChange('email')}
          />

          <FormField
            label="Contraseña"
            type="password"
            value={formData.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleChange('password')}
          />

          <button
            type="button"
            className="login-page__text-action"
            onClick={() => navigate('/recuperar-contrasena')}
          >
            ¿Olvidaste tu contraseña?
          </button>

          <Button
            variant="primary"
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>

          <button
            type="button"
            className="login-page__register"
            onClick={() => navigate('/registro-tutor')}
          >
            ¿Aún no tienes cuenta? Regístrate
          </button>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
