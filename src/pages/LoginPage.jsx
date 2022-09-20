import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//Local import
import { showError } from '../utils/notification';
import { useLogInMutation } from 'redux/api';

const LoginPage = () => {
  const [logIn, { isError }] = useLogInMutation();

  const handleSubitLogIn = evt => {
    evt.preventDefault();

    const data = new FormData(evt.currentTarget);
    const user = {
      email: data.get('email').trim(),
      password: data.get('password'),
    };

    if (user.email === '' || user.password === '') {
      return showError('One of the fields is empty');
    }

    logIn(user);
  };

  useEffect(() => {
    if (isError) {
      showError('Ups! Login or password is invalid');
    }
  }, [isError]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 4,
      }}
    >
      <Box
        sx={{
          padding: 4,
          bgcolor: '#fff',
          borderRadius: 4,

          '&:hover': { boxShadow: '0px 0px 42px -20px rgba(0,0,0,0.3)' },
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: '#4caf50',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubitLogIn}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  type="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
