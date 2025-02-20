import { useState } from "react";
import usePostData from "../../hooks/Datas/usePostData";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const mutation = usePostData();

  const { isError, isSuccess } = mutation;
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || price <= 0 || category.trim() === "") {
      setErrorMessage("Tüm alanlar dolu olmalıdır");
      return;
    }

    mutation.mutate({ title, price, category });
    setTitle("");
    setPrice(0);
    setCategory("");
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Yeni Ürün Ekle
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Ürün Başlığı"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Fiyat"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <TextField
            label="Kategori"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ürünü Ekle
          </Button>
        </Box>
        {isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Ürün başarıyla eklendi!
          </Alert>
        )}

        {errorMessage && !isSuccess && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}  
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Ürün eklenirken bir hata oluştu.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AddProduct;
