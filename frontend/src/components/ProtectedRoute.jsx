// react & packages
import { Outlet, Navigate } from 'react-router';
import { useState, useEffect } from 'react';

// style

// files

const ProtectedRoute = () => {
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  })

  const [authenticated, setAuthenticated] = useState(false);

  return authenticated ? <Outlet /> : <Navigate to="/log-in" />;
};
export default ProtectedRoute;
