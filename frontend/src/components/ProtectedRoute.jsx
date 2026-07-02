// react & packages
import { Outlet, Navigate } from 'react-router';
import { useState, useEffect } from 'react';

// style

// files

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });

        const data = await response.json();

        setAuthenticated(data.authenticated)
      } catch (err) {
        console.error(err)
        setAuthenticated(false)
      }
    }

    checkAuth();
  }, [])

  if (authenticated === null) {
    return <p>Loading...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/log-in" replace/>;
};
export default ProtectedRoute;
