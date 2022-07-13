import { Navigate, Outlet } from 'react-router-dom';
import useUser, { USER_STATES } from '../hooks/useUser';

export default function PublicRoutes() {
  const user = useUser();
  if (user === USER_STATES.NOT_KNOWN) return null;
  return user ? <Navigate to="dashboard" /> : <Outlet />;
}
