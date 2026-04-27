import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../hooks/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verify();
  }, []);

  // Checks if user is logged in on page load/refresh
  const verify = async () => {
    try {
      const data = await authService.me();
      // Laravel returns { message, user: { id, name, email, role, ... } }
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Laravel login returns { message } only, then we fetch the user
    await authService.login(email, password);
    const data = await authService.me();
    setUser(data?.user ?? null);
  };

  const signup = async (name, email, password) => {
    // Laravel register returns { message } only, then we log in
    await authService.signup(name, email, password);
    await login(email, password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;