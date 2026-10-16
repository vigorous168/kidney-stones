import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    // close();
    window.scrollTo(0, 0);
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open, close]);

  return (
    <div className="layout">
      <Header menuOpen={open} onToggleMenu={toggle} />
      <Sidebar open={open} onClose={close} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
