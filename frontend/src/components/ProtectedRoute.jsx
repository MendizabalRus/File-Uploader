// react & packages
import { Outlet, Navigate } from 'react-router';
import { useState } from 'react';

// style

// files

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return authenticated ? <Outlet /> : <Navigate to="/log-in" />;
};
export default ProtectedRoute;
