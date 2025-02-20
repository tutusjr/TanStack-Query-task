import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const user = localStorage.getItem("user");

  return user ? <Outlet /> : <Navigate to="/login" />;
};
