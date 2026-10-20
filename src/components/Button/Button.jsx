import './Button.css';

function Button({
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
}) {
  const isDisabled = disabled || variant === 'disabled';

  return (
    <button
      className={`button button--${variant}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;