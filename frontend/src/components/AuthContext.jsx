// packages
import { createContext, useContext, useEffect, useState } from "react";

// files
import { meRequest, loginRequest, logoutRequest } from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication state
  const checkAuth = async () => {
    try {
      const response = await meRequest();

      const data = await response.json();

      setAuthenticated(data.authenticated);
      setUser(data.user ?? null);
    } catch (err) {
      console.error(err);

      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Log in proccess
  const login = async (credentials) => {
    const response = await loginRequest(credentials);

    if (!response.ok) {
      throw new Error("Login failed");
    }

    await checkAuth();

    return await response.json();
  };

  // Log out proccess
  const logout = async () => {
    const response = await logoutRequest();

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    setAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    // eslint-disable-next-line 
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line 
export const useAuth = () => useContext(AuthContext);