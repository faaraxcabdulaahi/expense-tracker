import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, token } = useAuth();

  // If no token or no user → redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If authenticated → render child route
  return <Outlet />;
}
