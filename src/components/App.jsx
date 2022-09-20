import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import { PrivateRoute } from 'services/PrivateRoute';
import { PublicRoute } from 'services/PublicRoute';
import { useFetchCurrentUserQuery } from 'redux/api';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/authUser/authSelectors';
import { MainSpinner } from './MainSpinner/MainSpinner';

const Home = lazy(() => import('pages/Home'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const EditContactModal = lazy(() =>
  import('./EditContactModal/EditContactModal')
);
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

export const App = () => {
  const token = useSelector(getToken);

  const { isFetching } = useFetchCurrentUserQuery(undefined, { skip: !token });

  return !isFetching ? (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />

          <Route path="/" element={<PublicRoute restricted />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="contacts" element={<PrivateRoute />}>
            <Route path="/contacts" element={<ContactsPage />}>
              <Route path="edit/:contactId" element={<EditContactModal />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  ) : (
    <MainSpinner />
  );
};
