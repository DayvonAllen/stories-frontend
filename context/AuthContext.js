import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/" && router.pathname !== "/login")
      checkUserLoggedIn();
  }, []);

  // Register user
  const register = async ({ username, email, password }) => {
    const res = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setError(null);
      router.push("/login");
    } else {
      setError(data.message);
    }
  };

  // Login user
  const login = async ({ username, password }) => {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setError(null);
      setUser(data.user);
      router.push("/home");
    } else {
      setError(data.message);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`/api/logout`, {
      method: "GET",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`/api/isLoggedIn`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
