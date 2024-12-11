// "use client";

// // context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from "react";

// // Create the Auth context
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Simulated authentication check (replace with real logic)
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token"); // Example: check for a token in localStorage
//       setIsAuthenticated(!!token); // Set to true if token exists
//     };

//     checkAuth();
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // State for user role

  const router = useRouter();

  // Simulated authentication check (replace with real logic)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role"); // Retrieve role from localStorage
      if (token && userRole) {
        setIsAuthenticated(true);
        setRole(userRole); // Set the role if token and role are found
      }
    };

    checkAuth();
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role); // Store the role in localStorage
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
