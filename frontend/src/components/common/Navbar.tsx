import { useState } from "react";
import {
  Book,
  GraduationCap,
  Heart,
  House,
  Menu,
  MessageSquareText,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import avatar from "../../assets/avatar.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-18 bg-slate-100 border-b shadow-md sticky top-0 z-10">
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

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/" location={location}>
            Home
          </NavLink>
          <NavLink to="/courses/search" location={location}>
            Courses
          </NavLink>
          <NavLink to="/wishlist" location={location}>
            <Heart size={20} />
          </NavLink>
          <NavLink to="/chat" location={location}>
            <MessageSquareText size={20} />
          </NavLink>
        </div>

        {/* User Profile & Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link to="/profile/dashboard">
              <Avatar className="hover:scale-105 transition transform duration-300">
                <AvatarImage
                  src={user.profileImage || avatar}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm">avatar</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="rounded"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t p-4 absolute w-full left-0 top-16 z-20">
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-4"
          >
            <NavLink to="/" location={location}>
              <House /> Home
            </NavLink>
            <NavLink to="/courses/search" location={location}>
              <Book />
              Courses
            </NavLink>
            <NavLink to="/wishlist" location={location}>
              <Heart size={20} /> Wishlist
            </NavLink>
            <NavLink to="/chat" location={location}>
              <MessageSquareText size={20} /> Chat
            </NavLink>
            {user ? (
              <Link to="/profile/dashboard" className="flex items-center gap-2">
                <Avatar className="hover:scale-105 transition transform duration-300">
                  <AvatarImage
                    src={user.profileImage || avatar}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-sm">avatar</AvatarFallback>
                </Avatar>
                <span className="text-gray-700 font-semibold">Profile</span>
              </Link>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// NavLink Component for Active Styles
const NavLink = ({
  to,
  children,
  location,
}: {
  to: string;
  children: React.ReactNode;
  location: any;
}) => {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 font-semibold transition duration-300 ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-500"
          : "text-gray-700 hover:text-blue-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
