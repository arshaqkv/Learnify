import { GraduationCap } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section: Logo and Tagline */}
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          
          <div>
            <div className="flex  justify-center">
              <GraduationCap />
              <h2 className="text-2xl ml-2 font-bold">Learnify.</h2>
            </div>
            <p className="text-gray-400 text-sm">Learn your way</p>
          </div>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-4 text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              to="/about"
              className="hover:text-white transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-white transition"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Learnify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
