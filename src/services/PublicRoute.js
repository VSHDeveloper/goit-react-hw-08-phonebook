import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from 'redux/authUser/authSelectors';

export const PublicRoute = ({ restricted }) => {
  const token = useSelector(getToken);
  const shouldNavigate = token && restricted;

  return shouldNavigate ? <Navigate to="/contacts" /> : <Outlet />;
};
