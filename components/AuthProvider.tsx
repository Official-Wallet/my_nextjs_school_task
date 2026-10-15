"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

type CurrentUser = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: CurrentUser | null;
  // signup and login return an error message, or null if it worked
  signup: (name: string, email: string, password: string) => string | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function getUsers(): StoredUser[] {
  try {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  // Check if someone is already logged in when the page loads
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currentUser");
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  const signup = (name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();

    if (name.trim() === "" || cleanEmail === "" || password === "") {
      return "Please fill in all fields.";
    }
    if (!cleanEmail.includes("@")) {
      return "Please enter a valid email.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    const users = getUsers();
    if (users.find((u) => u.email === cleanEmail)) {
      return "An account with this email already exists.";
    }

    users.push({ name: name.trim(), email: cleanEmail, password });
    localStorage.setItem("users", JSON.stringify(users));

    const current = { name: name.trim(), email: cleanEmail };
    localStorage.setItem("currentUser", JSON.stringify(current));
    setUser(current);
    return null;
  };

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === "" || password === "") {
      return "Please fill in all fields.";
    }

    const found = getUsers().find((u) => u.email === cleanEmail && u.password === password);
    if (!found) {
      return "Wrong email or password.";
    }

    const current = { name: found.name, email: found.email };
    localStorage.setItem("currentUser", JSON.stringify(current));
    setUser(current);
    return null;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
