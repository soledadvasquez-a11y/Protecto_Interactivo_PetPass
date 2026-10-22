import './AlertModal.css';
import Button from '../Button/Button.jsx';

const alertConfig = {
  permission: {
    icon: '⌖',
    defaultTitle: 'Permiso de ubicación',
  },

  success: {
    icon: '✓',
    defaultTitle: 'Operación completada',
  },
};

function AlertModal({
  isOpen = false,
  variant = 'permission',
  title,
  message,
  actionLabel,
  secondaryLabel,
  onAction,
  onSecondary,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  const config =
    alertConfig[variant] || alertConfig.permission;

  const finalTitle =
    title || config.defaultTitle;

  return (
    <div
      className="alert-modal__overlay"
      onClick={onClose}
    >
      <section
        className={`alert-modal alert-modal--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-modal-title"
        aria-describedby="alert-modal-message"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="alert-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div
          className="alert-modal__icon"
          aria-hidden="true"
        >
          {config.icon}
        </div>

        <h2
          id="alert-modal-title"
          className="alert-modal__title"
        >
          {finalTitle}
        </h2>

        <p
          id="alert-modal-message"
          className="alert-modal__message"
        >
          {message}
        </p>

        <div className="alert-modal__actions">
          {secondaryLabel && (
            <Button
              variant="secondary"
              onClick={onSecondary}
            >
              {secondaryLabel}
            </Button>
          )}

          {actionLabel && (
            <Button
              variant={
                variant === 'success'
                  ? 'primary'
                  : 'primary'
              }
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default AlertModal;