import './Header.css';
import logoPetPass from '/src/assets/logo-petpass.svg';

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoPetPass}
        alt="PetPass"
      />

      <button
        className="header__menu"
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Header;