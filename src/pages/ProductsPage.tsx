import ProductList from "../components/Lists/ProductList";
import AddProduct from "../components/addOperations/AddProduct";
import { Typography } from "@mui/material";

export const ProductsPage = () => {
  return (
    <div>
      <Typography  variant="h4" mt={4} align="center" gutterBottom>
        Ürünler
      </Typography>
      <ProductList />
      <AddProduct />
    </div>
  );
};
