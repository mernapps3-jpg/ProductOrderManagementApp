import styles from '../styles/ui.module.css';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';



export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.container} ${styles.navbarInner}`}>
        <NavLink to="/" className={`${styles.linkBase} ${styles.navbarBrand}`}>
          <Logo className={styles.brandIcon} size={32} />
          <span>Proget Kart</span>
        </NavLink>
          <div className={styles.navAuth}>
              <NavLink
                to="/login"
                className={`${styles.linkBase} ${styles.btn} ${styles.btnGhost}`}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={`${styles.linkBase} ${styles.btn} ${styles.btnPrimary}`}
              >
                Create account
              </NavLink>
            </div>
      </div>
    </nav>
  );
}