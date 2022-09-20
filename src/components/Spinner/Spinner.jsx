import { CgSpinner } from 'react-icons/cg';
//Local import
import styles from './Spinner.module.scss';

export const Spinner = ({ size }) => {
  return <CgSpinner size={size} className={styles.spinner} />;
};
