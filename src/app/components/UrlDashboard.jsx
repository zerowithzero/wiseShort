"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function UrlDashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const { data } = await axios.get("/api/urls"); // Fetch all URLs
        setUrls(data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "shortUrl",
      headerName: "Short URL",
      minWidth: 320,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ wordBreak: "break-all" }}>
            {params.value}
          </Typography>
          <CopyToClipboard text={params.value} onCopy={() => setCopied(true)}>
            <IconButton size="small" color="primary">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </CopyToClipboard>
        </Box>
      ),
    },
    { field: "longUrl", headerName: "Long URL", minWidth: 320, flex: 1 },
    {
      field: "clickCount",
      headerName: "Clicks",
      width: 100,
      type: "number",
      flex: 1,
    },
    { field: "createdAt", headerName: "Created At", width: 180, flex: 1 },
  ];

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        📊 URL Dashboard
      </Typography>

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid
          rows={urls}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}
          autoHeight
          disableRowSelectionOnClick
          loading={loading}
        />
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
