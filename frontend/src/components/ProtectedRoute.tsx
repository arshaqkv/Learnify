
import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if(role && user?.role !== role) {
    return <Navigate to='/unauthorized'/>
  }

  return <Outlet />
};

export default ProtectedRoute;
