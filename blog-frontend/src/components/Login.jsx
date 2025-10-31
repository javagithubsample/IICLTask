import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken, isAuthenticated } from "../utils/auth";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate("/");
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username === "admin" && user.password === "admin123") {
      const fakeToken = "fake-jwt-token-12345";
      setToken(fakeToken);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 400);
    } else {
      toast.error("Invalid username or password!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          🔐 Admin Login
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Please enter your credentials to access the dashboard
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <CardActions sx={{ justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 5,
                py: 1.2,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0px 4px 10px rgba(25,118,210,0.4)",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  boxShadow: "0px 6px 14px rgba(21,101,192,0.6)",
                },
              }}
            >
              Login
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
}
