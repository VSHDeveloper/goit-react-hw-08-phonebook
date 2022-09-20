import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//Local import
import { Spinner } from '../Spinner/Spinner';
import { useDeleteContactMutation } from 'redux/api';

const ContactItem = ({ contact: { id, name, number } }) => {
  const navigate = useNavigate();
  const [deleteContact, { isLoading: isLoadingDelete }] =
    useDeleteContactMutation();

  return (
    <>
      <Box
        component="li"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography component="p" variant="span" sx={{ width: '45%' }}>
          {name}:
        </Typography>

        <Typography component="p" variant="span" sx={{ textAlign: 'left' }}>
          {number}
        </Typography>

        <IconButton
          aria-label="edit"
          onClick={() => navigate(`/contacts/edit/${id}`)}
          sx={{
            marginLeft: 'auto',
            '&:hover, &:focus': { bgcolor: '#d7f0d0', color: '#468d46' },
          }}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          onClick={() => deleteContact(id)}
          disabled={isLoadingDelete}
          sx={{
            marginLeft: '3px',
            '&:hover, &:focus': { bgcolor: '#f3dacf', color: '#d31616' },
          }}
        >
          {!isLoadingDelete ? <DeleteIcon /> : <Spinner size={20} />}
        </IconButton>
      </Box>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
