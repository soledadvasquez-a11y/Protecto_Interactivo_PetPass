import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';

import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    /*
      Simulación de interfaz.
      El correo real se enviará cuando exista backend.
    */
    setSent(true);
  };

  return (
    <main className="forgot-page">
      <section className="forgot-page__card">
        <button
          type="button"
          className="forgot-page__back"
          onClick={() => navigate('/login')}
        >
          ← Volver
        </button>

        <h1>Recuperar contraseña</h1>

        <p className="forgot-page__description">
          Ingresa tu correo para continuar con la recuperación.
        </p>

        <div className="forgot-page__form">
          <FormField
            label="Correo electrónico"
            type="email"
            value={email}
            placeholder="correo@ejemplo.com"
            onChange={(event) => {
              setEmail(event.target.value);
              setSent(false);
            }}
          />

          <Button
            variant="primary"
            disabled={!email.trim()}
            onClick={handleSend}
          >
            Enviar instrucciones
          </Button>

          {sent && (
            <p
              className="forgot-page__success"
              role="status"
            >
              Solicitud preparada. El envío real se conectará al backend.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default ForgotPasswordPage;