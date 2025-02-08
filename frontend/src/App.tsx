import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Suspense } from "react";
import AppRoutes from "./routes/Routes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};
const App = () => {
  return (
    <>
      <Layout>
        <Toaster />
        <Suspense fallback={<div className="flex h-screen items-center justify-center text-lg">Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </Layout>
    </>
  );
};

export default App;
