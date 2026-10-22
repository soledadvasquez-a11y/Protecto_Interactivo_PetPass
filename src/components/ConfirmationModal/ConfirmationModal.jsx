import './ConfirmationModal.css';
import Button from '../Button/Button.jsx';

function ConfirmationModal({
  isOpen = false,
  variant = 'neutral',
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  const confirmVariant =
    variant === 'danger' ? 'danger' : 'primary';

  return (
    <div className="confirmation-modal__overlay">
      <section
        className={`confirmation-modal confirmation-modal--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-message"
      >
        <h2
          id="confirmation-modal-title"
          className="confirmation-modal__title"
        >
          {title}
        </h2>

        <p
          id="confirmation-modal-message"
          className="confirmation-modal__message"
        >
          {message}
        </p>

        <div className="confirmation-modal__actions">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>

          <Button
            variant={confirmVariant}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmationModal;