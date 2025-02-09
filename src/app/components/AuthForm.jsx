"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(isSignup ? "/api/signup" : "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem("supabase-token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push("/dashboard");
          setLoading(false);
        }, 2000);
      } else {
        setError(data.error || "Something went wrong, please try again.");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
          {isSignup ? "Create an Account" : "Welcome Back!"}
        </Typography>

        {/* Email input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password input */}
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isSignup ? (
            "Sign Up"
          ) : (
            "Log In"
          )}
        </Button>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button color="primary" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Log In" : "Sign Up"}
            </Button>
          </Typography>
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
            {isSignup
              ? "Sign-up successful! Redirecting to login..."
              : "Login successful! Redirecting..."}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
