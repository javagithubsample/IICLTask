import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogView from "./components/BlogView";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/add" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
          <Route path="/view/:id" element={<BlogView />} />
        </Route>
      </Routes>
    </Router>
  );
}
