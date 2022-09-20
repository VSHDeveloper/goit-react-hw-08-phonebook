import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
//Local import
import { getIsLoggedIn } from 'redux/authUser/authSelectors';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    isLoggedIn && (
      <nav>
        <NavLink
          to={'contacts'}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
          }
        >
          Contacts
        </NavLink>
      </nav>
    )
  );
};
