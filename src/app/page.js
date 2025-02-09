import { Box, Container, Typography } from "@mui/material";
import ShortenerForm from "./components/ShortenForm";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{width: '100vw'}}>
      <Box textAlign="center" mt={5} mb={5}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          🚀 Fast & Secure URL Shortener
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Shorten your URLs and track clicks with analytics.
        </Typography>
      </Box>
      <ShortenerForm />
    </Container>
  );
}
