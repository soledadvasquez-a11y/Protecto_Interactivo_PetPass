import { useState } from 'react';
import FormField from '../components/FormField/FormField.jsx';
import Button from '../components/Button/Button.jsx';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal.jsx';
import './AccountPage.css';

function AccountPage() {
  const [formData, setFormData] = useState({
    name: 'Usuario',
    phone: '',
    email: '',
    password: '',
    address: '',
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="account-page">
      <h1 className="account-page__title">Mi Cuenta</h1>

      {/* Tarjeta verde oliva con avatar central */}
      <section className="account-page__card">
        <div className="account-page__avatar-wrapper">
          <div className="account-page__avatar" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5e5a57"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="account-page__avatar-icon"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* Icono flotante de cámara */}
          <button
            type="button"
            className="account-page__camera-btn"
            aria-label="Cambiar foto de perfil"
          >
            <svg
              viewBox="0 0 24 24"
              fill="#df6d41"
              className="account-page__btn-icon"
            >
              <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>
          </button>
        </div>

        <h2 className="account-page__user-name">{formData.name}</h2>

        {/* Formulario usando el componente FormField oficial */}
        <div className="account-page__form">
          <FormField
            label="Nombre completo"
            name="name"
            value={formData.name}
            onChange={handleChange('name')}
          />

          <FormField
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange('phone')}
          />

          <FormField
            label="Correo"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
          />

          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
          />

          <div className="account-page__address-container">
            <FormField
              label="Direccion"
              name="address"
              value={formData.address}
              onChange={handleChange('address')}
            />
            {/* Icono de edición cuadrado naranja de Figma */}
            <button
              type="button"
              className="account-page__edit-btn"
              aria-label="Editar dirección"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="account-page__btn-icon"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Enlace y botón Eliminar cuenta con el Button oficial */}
      <footer className="account-page__footer">
        <a href="#terminos" className="account-page__terms-link">
          Términos y condiciones
        </a>

        <Button
          variant="danger"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Eliminar cuenta
        </Button>
      </footer>

      {/* Modal oficial ConfirmationModal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        variant="danger"
        title="Eliminar Cuenta"
        message="¿Estás seguro de que deseas eliminar tu cuenta? Tendrás que iniciar sesión nuevamente."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}

export default AccountPage;