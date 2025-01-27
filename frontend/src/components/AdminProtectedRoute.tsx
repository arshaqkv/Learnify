
import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role?: string
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.admin);
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if(role && user?.role !== role) {
    return <Navigate to='/unauthorized'/>
  }

  return <Outlet />
};

export default AdminProtectedRoute;
