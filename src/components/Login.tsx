import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Giriş Yap
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="E-posta Adresi"
              variant="outlined"
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Şifre"
              variant="outlined"
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Giriş Yap
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
