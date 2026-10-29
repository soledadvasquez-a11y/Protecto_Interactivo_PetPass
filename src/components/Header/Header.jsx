import './Header.css';
import Logo from '/src/assets/Logo.svg';

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={Logo}
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