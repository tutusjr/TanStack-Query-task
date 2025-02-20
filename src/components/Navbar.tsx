import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Ana Sayfa
        </Button>
        <Button
          component={Link}
          to="/datas"
          color="inherit"
        >
          Veri Sayfası
        </Button>
      </Toolbar>
    </AppBar>
  );
};
