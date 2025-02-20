import { Link } from "react-router";
import { Box, Button, Typography, Container, Paper } from "@mui/material";

export const DatasPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Veri Sayfası
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Buradan ürünlere veya kullanıcılara kolayca geçiş yapabilirsiniz. 
          Her iki sayfa üzerinden verilerinizi yönetebilirsiniz.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/datas/products"
            sx={{ width: "150px" }}
          >
            Ürünlere Git
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/datas/users"
            sx={{ width: "150px" }}
          >
            Kullanıcılara Git
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
