import { useState } from "react";
import { usePostUser } from "../../hooks/Users/usePostUser";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = usePostUser();
  const { isError, isSuccess } = mutation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !website.trim()) {
      setErrorMessage("Tüm alanlar dolu olmalıdır.");
      return;
    }

    mutation.mutate({ name, username, website });

    setName("");
    setUsername("");
    setWebsite("");
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Yeni kullanici ekle
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Isim"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Kullanici Adi"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Website"
            variant="outlined"
            fullWidth
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Kullanici Ekle
          </Button>
        </Box>
        {isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Kullanici basariyla eklendi!
          </Alert>
        )}
        {errorMessage && !isSuccess && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Kullanici eklenirken hata
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AddUser;
