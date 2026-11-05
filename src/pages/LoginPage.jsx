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
      {/* Elemento gráfico para la mancha azul en el fondo */}
      <div className="login-page__bg-blob" aria-hidden="true" />

      <section className="login-page__card">
        {/* Cabecera con el Logo PetPass fuera de la tarjeta oscura */}
        <div className="login-page__brand">
          <span className="login-page__brand-mark">
            PetPass
          </span>
        </div>

        {/* Tarjeta flotante con el formulario */}
        <div className="login-page__box">
          <h1>LOGIN</h1>

          <div className="login-page__form">
            <FormField
              label=""
              type="email"
              value={formData.email}
              placeholder="Correo"
              onChange={handleChange('email')}
            />

            <FormField
              label=""
              type="password"
              value={formData.password}
              placeholder="Contraseña"
              onChange={handleChange('password')}
            />

            <button
              type="button"
              className="login-page__text-action"
              onClick={() => navigate('/recuperar-contrasena')}
            >
              Restablecer contraseña
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
        </div>
      </section>
    </main>
  );
}

export default LoginPage;