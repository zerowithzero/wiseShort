"use client";

import { useEffect, useState } from "react";
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
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import the logout icon
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/wiseshort.png"; // Ensure correct path

export default function Header({ session, getSession }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [sessionDetails, setSessionDetails] = useState(null);

  // async function getSessionDetails() {
  //   const details = await getSession(localStorage.getItem("supabase-token"));
  //   setSessionDetails(details);
  // }

  const logoDimensions = isMobile ? 40 : 50;
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

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      const data = await response.json();
      if (response.ok) {
        localStorage.clear();
        router.push("/login");
      } else {
        console.error("Logout failed:", data.error);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   getSessionDetails();
  // }, []);
  return (
    <AppBar
      position="sticky"
      sx={{ background: "#54a0ff", px: 2, width: "100vw" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Logo & Brand Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/")}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              width: logoDimensions + 5,
              height: logoDimensions + 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#54a0ff",
              },
            }}
          >
            <Image
              src={logo}
              alt="WiseShort Logo"
              width={logoDimensions}
              height={logoDimensions}
              className="logo-rotate"
              style={{
                borderRadius: "50%",
              }}
            />
          </Box>

          {!isMobile && (
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: 1,
                color: "white",
              }}
            >
              WiseShort
            </Typography>
          )}
        </Box>

        {/* Right: Menu & Navigation */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Desktop Menu */}
          {!isMobile && (
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
              {/* Logout Button (Desktop) */}
              {/* {sessionDetails ? (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<ExitToAppIcon />}
                  sx={{ fontWeight: "bold", paddingLeft: 2 }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => handleNavigation("/login")}
                  startIcon={<ExitToAppIcon />}
                  sx={{ fontWeight: "bold", paddingLeft: 2 }}
                >
                  Login
                </Button>
              )} */}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer (Fixed White Space Issue) */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          sx: {
            width: "200px",
            mt: "10px", // Small margin for better alignment
            boxShadow: 3,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigation("/dashboard")}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/about")}>About</MenuItem>
        {/* Logout Button (Mobile) */}
        {/* <MenuItem onClick={handleLogout} sx={{ display: "flex", gap: 1 }}>
          <ExitToAppIcon /> Logout
        </MenuItem> */}
      </Menu>
    </AppBar>
  );
}
