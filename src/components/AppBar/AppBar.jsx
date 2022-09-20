import { useSelector } from 'react-redux';
//Material UI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//Local import
import { Navigation } from 'components/Navigation/Navigation';
import { AuthNav } from 'components/AuthNav/AuthNav';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { getIsLoggedIn } from 'redux/authUser/authSelectors';

export const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '70px',
        bgcolor: '#fdc018',
        padding: '15px',
        marginBottom: '15px',
      }}
    >
      <Container
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Navigation />

        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </Container>
    </Grid>
  );
};
