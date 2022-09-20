import { useSelector } from 'react-redux';
//Material UI
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
//Local import
import { getAuthName } from 'redux/authUser/authSelectors';
import { useLogOutMutation } from 'redux/api';

export const UserMenu = () => {
  const userName = useSelector(getAuthName);

  const [logOut] = useLogOutMutation();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
      }}
    >
      <Typography component="span" sx={{}}>
        Welcome, {userName}
      </Typography>

      <IconButton
        type="button"
        aria-label="logout"
        onClick={handleLogOut}
        sx={{
          marginLeft: '15px',
          color: 'black',

          '&:hover': {
            bgcolor: '#f0b515',
          },
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};
