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
      {/* Fondo decorativo */}
      <div className="forgot-page__bg-blob" aria-hidden="true" />

      <section className="forgot-page__card">
        {/* Marca superior fuera de la tarjeta flotante */}
        <div className="forgot-page__brand">
          <span className="forgot-page__brand-mark">
            PetPass
          </span>
        </div>

        {/* Tarjeta flotante con los campos */}
        <div className="forgot-page__box">
          <h1>¿Olvidó su contraseña?</h1>

          <p className="forgot-page__description">
            Escribe tu dirección de correo electrónico y te enviaremos las instrucciones para restablecer la contraseña.
          </p>

          <div className="forgot-page__form">
            <FormField
              label=""
              type="email"
              value={email}
              placeholder="Correo"
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
              Continuar
            </Button>

            <button
              type="button"
              className="forgot-page__back"
              onClick={() => navigate('/login')}
            >
              Volver al LOGIN
            </button>

            {sent && (
              <p
                className="forgot-page__success"
                role="status"
              >
                Solicitud preparada. El envío real se conectará al backend.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPasswordPage;