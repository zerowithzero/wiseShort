import React from "react";
import { Container, Box, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, px: { xs: 2, md: 0 }, width: "100vw" }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About WiseShort
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your Smart URL Shortener
        </Typography>
      </Box>

      {/* Overview Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          WiseShort is an innovative URL shortener developed in just 2-3 hours
          on a weekend. Built by a passionate software engineer, this
          open-source project aims to provide a simple yet powerful tool to
          convert long URLs into concise, shareable links.
        </Typography>
        <Typography variant="body1" paragraph>
          Although authentication isn’t implemented yet, it’s on the roadmap for
          future updates. The vision is to continuously improve WiseShort
          through community feedback and ongoing development.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Features
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1">
            Instant URL shortening with custom alias support.
          </Typography>
          <Typography component="li" variant="body1">
            Lightning-fast redirection for a seamless experience.
          </Typography>
          <Typography component="li" variant="body1">
            Robust architecture leveraging Supabase and Redis.
          </Typography>
          <Typography component="li" variant="body1">
            A minimal and responsive UI built with Next.js and Material UI.
          </Typography>
        </Box>
      </Box>

      {/* Future Plans Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Future Roadmap
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1">
            Integration of user authentication for personalized link management.
          </Typography>
          <Typography component="li" variant="body1">
            Development of an analytics dashboard to track link performance.
          </Typography>
          <Typography component="li" variant="body1">
            Features like expiring links and an admin panel for moderation.
          </Typography>
          <Typography component="li" variant="body1">
            A browser extension for seamless URL shortening on the go.
          </Typography>
        </Box>
      </Box>

      {/* Closing Section */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Built with passion by a dedicated software engineer who loves creating
          impactful solutions. WiseShort is fully open-source – contributions
          and feedback are always welcome!
        </Typography>
      </Box>
    </Container>
  );
}
