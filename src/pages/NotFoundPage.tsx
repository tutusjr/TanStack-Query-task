import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Üzgünüz, aradığınız sayfa mevcut değil.</p>
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  );
};
