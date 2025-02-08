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

export default function Login() {
  const router = useRouter();

  // State management for form fields and error/success messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle form submission
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // Example API call for login (replace with actual login logic)
      // await api.login({ email, password });

      // Simulating successful login
      setLoading(false);
      setOpenSnackbar(true); // Show success message
      setTimeout(() => router.push("/dashboard"), 2000); // Redirect to dashboard after 2 seconds
    } catch (err) {
      setLoading(false);
      setError("Invalid credentials, please try again.");
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
          Welcome Back!
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
            Login successful! Redirecting...
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
