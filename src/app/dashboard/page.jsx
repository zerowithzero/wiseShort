import { Container, Box, Typography } from "@mui/material";
import UrlDashboard from "../components/UrlDashboard";

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={2}>
          🔗 URL Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          View your shortened links and track clicks.
        </Typography>
      </Box>
      <UrlDashboard />
    </Container>
  );
}
