import { useSelector, useDispatch } from 'react-redux';
//Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
//Local import
import { setFilter } from 'redux/contacts/contactsSlice';
import { getFilter } from 'redux/contacts/contactsSelectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const matches = useMediaQuery('(min-width:600px)');

  const handleChangeFilter = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  return (
    <Box component="div" sx={{ marginTop: `${matches ? '0px' : '25px'}` }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        Your contacts
      </Typography>

      <TextField
        fullWidth
        id="filter"
        label="Find contact by name"
        name="filter"
        variant="standard"
        onChange={handleChangeFilter}
        value={filter}
        sx={{
          '& label': { fontSize: 14 },
        }}
      />
    </Box>
  );
};

export default Filter;
