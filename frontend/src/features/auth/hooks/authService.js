const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api`;

const getCsrfCookie = () =>
  fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

export const authService = {
  login: async (email, password) => {
    await getCsrfCookie();
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Login failed");
    }
    return res.json(); // returns { message: "User login successfully!!" }
  },

  signup: async (name, email, password) => {
    await getCsrfCookie();
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Signup failed");
    }
    return res.json(); // returns { message: "User registered successfully!!" }
  },

  logout: async () => {
    await getCsrfCookie();
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Accept": "application/json" },
    });
  },

  me: async () => {
    const res = await fetch(`${API_URL}/profile`, {
      credentials: "include",
      headers: { "Accept": "application/json" },
    });
    if (!res.ok) return null; // not logged in
    return res.json();
  },
};