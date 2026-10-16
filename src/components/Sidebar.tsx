import { NavLink } from 'react-router-dom';
import { getArticles } from '../lib/articles';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`overlay${open ? ' overlay--show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        id="sidebar"
        className={`sidebar${open ? ' sidebar--open' : ''}`}
        aria-label="主選單"
        aria-hidden={!open}
        inert={!open}
      >
        <button type="button" className="sidebar__close" onClick={onClose}>
          關閉 ✕
        </button>
        <ul className="sidebar__list">
          <li>
            <NavLink to="/" end>
              首頁
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles" end>
              全部文章
            </NavLink>
          </li>
          {getArticles().map((a) => (
            <li key={a.slug}>
              <NavLink to={`/articles/${a.slug}`}>{a.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
