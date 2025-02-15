import { GraduationCap, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import avatar from "../../assets/avatar.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="h-16 bg-white border-b shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GraduationCap size={30} className="text-blue-600" />
          <h1 className="font-extrabold text-2xl">
            <Link to="/" className="text-blue-600 transition duration-300">
              Learnify.
            </Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/courses/search" location={location}>
            COURSES
          </NavLink>
          <NavLink to="/wishlist" location={location}>
            <Heart className="text-red-500" size={20} /> WISHLIST
          </NavLink>
        </div>

        {/* User Profile or Auth Buttons */}
        <div>
          {user ? (
            <Link to="/profile/dashboard">
              <Avatar className="hover:scale-105 transition transform duration-300">
                <AvatarImage src={user.profileImage || avatar} />
                <AvatarFallback>
                  <img src={avatar} alt="User" className="rounded-full" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate("/login")} variant="outline">
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// NavLink Component for Active Styles
const NavLink = ({ to, children, location }: { to: string; children: React.ReactNode; location: any }) => {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 font-medium transition duration-300 ${
        isActive ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
