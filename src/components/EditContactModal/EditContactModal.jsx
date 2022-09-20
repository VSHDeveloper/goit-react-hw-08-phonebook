//Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
//Local import
import Modal from 'components/Modal';
import { useEditContactModal } from 'hooks/useEditContactModal';

const EditContactModal = () => {
  const {
    name,
    phone,
    nameError,
    phoneError,
    handleChangeName,
    handleChangePhone,
    handleEditContact,
  } = useEditContactModal();

  return (
    <Modal>
      <Box
        width={{ xs: '75%', sm: '50%', md: '35%', lg: '25%', xl: '20%' }}
        padding={{ xs: 3, sm: 4 }}
        sx={{
          bgcolor: '#fff',
          borderRadius: 4,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 42px -20px rgba(0,0,0,0.3)',
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            textAlign: 'center',
            marginBottom: 2,
          }}
        >
          Edit contact
        </Typography>

        <Box component="form" noValidate onSubmit={handleEditContact} sx={{}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                type="text"
                fullWidth
                id="name"
                label="Name"
                name="name"
                error={nameError}
                onChange={handleChangeName}
                value={name}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type="tel"
                fullWidth
                id="number"
                label="Number"
                name="number"
                error={phoneError}
                onChange={handleChangePhone}
                value={phone}
                variant="standard"
                onKeyPress={e => !/[0-9]/.test(e.key) && e.preventDefault()}
              />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Edit contact
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditContactModal;
