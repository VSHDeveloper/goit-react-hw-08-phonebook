//Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
//Local import
import { useAddContact } from 'hooks/useAddContact';
import { Spinner } from 'components/Spinner/Spinner';

export const ContactForm = () => {
  const {
    name,
    phone,
    handleAddContact,
    handleChangeName,
    handleChangePhone,
    isLoading,
    nameError,
    phoneError,
  } = useAddContact();

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        Phonebook
      </Typography>

      <Box
        sx={{
          padding: 4,
          bgcolor: '#fff',
          borderRadius: 4,

          '&:hover': { boxShadow: '0px 0px 42px -20px rgba(0,0,0,0.3)' },
        }}
      >
        <CssBaseline />
        <Box component="form" noValidate onSubmit={handleAddContact} sx={{}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={nameError}
                type="text"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                variant="standard"
                onChange={handleChangeName}
                value={name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="tel"
                error={phoneError}
                required
                fullWidth
                id="number"
                label="Phone"
                name="number"
                variant="standard"
                onChange={handleChangePhone}
                value={phone}
                onKeyPress={e => !/[0-9]/.test(e.key) && e.preventDefault()}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            disabled={name.length < 3}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Add contact {isLoading && <Spinner size={20} />}
          </Button>
        </Box>
      </Box>
    </>
  );
};
