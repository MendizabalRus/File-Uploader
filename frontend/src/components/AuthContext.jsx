import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication state
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });

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
    const response = await fetch("http://localhost:8080/api/log-in", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    await checkAuth();

    return await response.json();
  };

  // Log out proccess
  const logout = async () => {
    const response = await fetch("http://localhost:8080/api/log-out", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    setAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
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

export const useAuth = () => useContext(AuthContext);