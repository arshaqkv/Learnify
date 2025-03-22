import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/Routes";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { config } from "./config/config";
import { disconnectSocket, setOnlineUsers, setSocket, updateMessages } from "./features/chat/chatSlice";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isInstructorRoute = location.pathname.startsWith("/instructor");
  const chatRoute = location.pathname.startsWith("/chat");
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && !isInstructorRoute && !chatRoute && <Footer />}
    </>
  );
};
const App = () => {
  const { onlineUsers } = useAppSelector(state => state.chat)
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      const newSocket = io(config.app.BASE_URL, {
        query: {
          userId: user._id,
        },
      });

      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });
  
      newSocket.on("newMessage", (message) => {
        dispatch(updateMessages(message));
      });
  
      return () => {
        newSocket.disconnect()
        dispatch(disconnectSocket());
      };
    }
  }, [dispatch, user]);

console.log(onlineUsers)
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
