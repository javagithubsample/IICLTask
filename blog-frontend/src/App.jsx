// App.jsx
import React, { useEffect, useState } from "react";
import SwaggerPage from "./components/SwaggerPage";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogView from "./components/BlogView";
import Login from "./components/Login";
import { isAuthenticated } from "./utils/auth";

function AppRoutes() {
  const [auth, setAuth] = useState(isAuthenticated());
  const location = useLocation();

  
  useEffect(() => {
    const interval = setInterval(() => {
      setAuth(isAuthenticated());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  
  if (!auth && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  
  if (auth && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      {/* Public: Login only */}
      <Route path="/login" element={<Login />} />

      {/* Private: Everything else uses Layout */}
      {auth && (
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/add" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
          <Route path="/view/:id" element={<BlogView />} />
        </Route>
      )}
/* inside your Routes */
<Route path="/swagger" element={<SwaggerPage />} />
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={auth ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
