"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Button,
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  // Columns for DataGrid view
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "shortUrl",
      headerName: "Short URL",
      minWidth: 420,
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        p: 3,
        maxHeight: "65vh",
        overflowY: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer 10+
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, Opera
        },
      }}
    >
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : isSmallScreen ? (
        // Render as cards for small screens
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {urls.map((row) => (
            <Card key={row.id} sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Short URL:
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                  {row.shortUrl}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  Long URL:
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                  {row.longUrl}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  Clicks:
                </Typography>
                <Typography variant="body2">{row.clickCount}</Typography>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  Created At:
                </Typography>
                <Typography variant="body2">{row.createdAt}</Typography>
              </CardContent>
              <CardActions>
                <CopyToClipboard
                  text={row.shortUrl}
                  onCopy={() => setCopied(true)}
                >
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<ContentCopyIcon />}
                  >
                    Copy URL
                  </Button>
                </CopyToClipboard>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        // Render DataGrid for medium and larger screens
        <DataGrid
          rows={urls}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}
          autoHeight
          disableRowSelectionOnClick
        />
      )}

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
