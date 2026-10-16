import { Link } from 'react-router-dom';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className="header">
      <button
        type="button"
        className="hamburger"
        aria-label={menuOpen ? '關閉選單' : '開啟選單'}
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        onClick={onToggleMenu}
      >
        <span className="hamburger__bar" />
        <span className="hamburger__bar" />
        <span className="hamburger__bar" />
      </button>
      <Link to="/" className="header__title">
        腎結石衛教
      </Link>
    </header>
  );
}
