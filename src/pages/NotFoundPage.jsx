//Material UI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const NotFoundPage = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 10,
      }}
    >
      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontSize: `${matches ? '60px' : '48px'}`,
          textAlign: 'center',
          marginBottom: 3,
          color: '#dddddd',
        }}
      >
        Page not found...
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
