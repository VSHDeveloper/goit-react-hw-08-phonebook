import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Material UI
import Container from '@mui/material/Container';

const Modal = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        navigate('/contacts');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      navigate('/contacts');
    }
  };

  return (
    <Container
      maxWidth="false"
      component="div"
      onClick={handleBackdropClick}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1200,
      }}
    >
      {children}
    </Container>
  );
};

export default Modal;
