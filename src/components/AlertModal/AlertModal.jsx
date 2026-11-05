import './AlertModal.css';

function AlertModal({
  isOpen = false,
  variant = 'perdido', // 'perdido' | 'emergencia' | 'permission'
  title = 'Perdido',
  message,
  imageSrc,
  contactText,
  actionLabel,
  onAction,
  onClose,
}) {
  if (!isOpen) return null;

  const isEmergency = variant === 'emergencia';

  return (
    <div className="alert-modal__overlay" onClick={onClose}>
      <section
        className={`alert-modal ${isEmergency ? 'alert-modal--danger' : 'alert-modal--olive'}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="alert-modal__close-btn"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <h2 className="alert-modal__header-title">{title}</h2>

        <div className="alert-modal__card-body">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="alert-modal__poster-img" />
          ) : (
            <div className="alert-modal__poster-placeholder">
              <span className="alert-modal__poster-badge">{title.toUpperCase()}</span>
              {contactText && <p className="alert-modal__poster-info">{contactText}</p>}
            </div>
          )}
        </div>

        {message && <p className="alert-modal__footer-text">{message}</p>}

        {actionLabel && (
          <button
            type="button"
            className="alert-modal__action-button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </section>
    </div>
  );
}

export default AlertModal;