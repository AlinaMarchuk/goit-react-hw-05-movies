import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/movies" className={css.link}>
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <section>
          <div className={css.container}>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
};

export default Layout;
