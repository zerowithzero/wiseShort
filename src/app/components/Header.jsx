"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

export default function Header({ session }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleNavigation = (path) => {
    router.push(path);
    handleMenuClose();
  };

  // Logout function
  const handleLogout = async () => {
    setLoading(true);

    try {
      // Make a POST request to the logout API
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push("/login");
      } else {
        console.error("Logout failed:", data.error);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }

    setLoading(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Brand Logo */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => handleNavigation("/")}
        >
          🌐 WiseShort
        </Typography>

        {/* Mobile Menu Icon */}
        {isMobile ? (
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        ) : (
          // Desktop Menu - Centered Menus
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button color="inherit" onClick={() => handleNavigation("/")}>
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </Button>
          </Box>
        )}

        {/* Right Action Buttons */}
        <Box>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button> */}
          {/* <Button color="inherit" onClick={() => handleNavigation("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/signup")}>
            Sign Up
          </Button> */}
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigation("/dashboard")}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/about")}>About</MenuItem>
        <MenuItem onClick={() => handleNavigation("/login")}>Login</MenuItem>
        <MenuItem onClick={() => handleNavigation("/signup")}>Sign Up</MenuItem>
      </Menu>
    </AppBar>
  );
}
