import { Box, Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';

export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      title: 'Dashboard',
      description: 'Tüm verilerinizi tek bir yerden yönetin',
      path: '/datas'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Kullanıcılar',
      description: 'Kullanıcı yönetimi ve izinler',
      path: '/datas/users'
    },
    {
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      title: 'Ürünler',
      description: 'Ürün kataloğu ve stok yönetimi',
      path: '/datas/products'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hoş Geldiniz
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Yönetim Panelinize Erişin
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" paragraph>
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(feature.path)}
                sx={{ mt: 2 }}
              >
                Görüntüle
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
