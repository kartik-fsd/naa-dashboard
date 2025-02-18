import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/auth";

const TOKEN_KEY = "jwt_token";
const USER_KEY = "user_data";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token & user data from session storage when app starts
  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    const storedUserData = sessionStorage.getItem(USER_KEY);

    try {
      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUserData) {
        const parsedUser = JSON.parse(storedUserData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login: Save token & user details in session storage
  const login = useCallback((newToken: string, newUser: User) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, newToken);
      sessionStorage.setItem(USER_KEY, JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      console.error("Error storing auth data:", error);
      // Handle the error appropriately
    }
  }, []);

  // Logout: Remove token & user data from session storage
  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);

      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle the error appropriately
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
