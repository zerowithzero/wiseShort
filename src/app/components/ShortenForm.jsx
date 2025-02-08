"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleShorten = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/shorten", {
        longUrl,
        customAlias,
      });
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        borderRadius: 2,
        bgcolor: theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🔗 URL Shortener
      </Typography>

      {/* Long URL Input */}
      <TextField
        label="Enter Long URL"
        fullWidth
        variant="outlined"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Custom Alias Input */}
      <TextField
        label="Custom Alias (optional)"
        fullWidth
        variant="outlined"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Shorten Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ py: 1.5, fontWeight: "bold" }}
        onClick={handleShorten}
        disabled={loading || !longUrl}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Shorten URL"
        )}
      </Button>

      {/* Short URL Display */}
      {shortUrl && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
            bgcolor: theme.palette.mode === "dark" ? "#333" : "#F5F5F5",
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
            {shortUrl}
          </Typography>
          <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
            <IconButton color="primary">
              <ContentCopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Copy Notification */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
      >
        <Alert severity="success">Copied to clipboard!</Alert>
      </Snackbar>
    </Box>
  );
}
