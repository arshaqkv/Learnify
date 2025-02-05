
import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'student' && user?.role !== 'instructor') {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />
};

export default ProtectedRoute;
