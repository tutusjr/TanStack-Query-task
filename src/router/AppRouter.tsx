import { Navbar } from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router";
import { HomePage } from "../pages/HomePage";
import { DatasPage } from "../pages/DatasPage";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import "../App.css";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductsPage } from "../pages/ProductsPage";
import { UsersPage } from "../pages/UsersPage";

export const AppRouter = () => {
  const NavbarWrapper = () => {
    const location = useLocation();
    return location.pathname !== '/login' && <Navbar />;
  };

  return (
    <Router>
      <div>
        <NavbarWrapper />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/datas" element={<DatasPage />} />
            <Route path="/datas/products" element={<ProductsPage />} />
            <Route path="/datas/users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};
