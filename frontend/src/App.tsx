import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/Routes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isInstructorRoute = location.pathname.startsWith("/instructor")
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && !isInstructorRoute && <Footer />}
    </>
  );
};
const App = () => {
  return (
    <>
      <Layout>
        <Toaster />
        <AppRoutes />
      </Layout>
    </>
  );
};

export default App;
