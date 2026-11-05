import './ConfirmationModal.css';

function IconTrash() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  );
}

function ConfirmationModal({
  isOpen = false,
  variant = 'danger',
  title = 'Eliminar Cuenta',
  message = '¿Estás seguro de que deseas eliminar tu cuenta? Tendrás que iniciar sesión nuevamente.',
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal__overlay" onClick={onCancel}>
      <section
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmation-modal__badge" aria-hidden="true">
          {variant === 'logout' ? <IconLogout /> : <IconTrash />}
        </div>

        <h2 id="confirmation-modal-title" className="confirmation-modal__title">
          {title}
        </h2>

        <p id="confirmation-modal-message" className="confirmation-modal__message">
          {message}
        </p>

        <div className="confirmation-modal__actions">
          <button
            type="button"
            className="confirmation-modal__btn confirmation-modal__btn--cancel"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            className="confirmation-modal__btn confirmation-modal__btn--confirm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmationModal;