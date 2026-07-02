// react & packages
import { Outlet, Navigate } from 'react-router';
import { useAuth } from "./AuthContext"

// style

// files

const ProtectedRoute = () => {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/log-in" replace />;
};
export default ProtectedRoute;
