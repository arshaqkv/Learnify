import { GraduationCap } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <GraduationCap size={28} className="text-gray-800" />
            <h2 className="text-2xl font-bold">Learnify</h2>
          </div>
          <p className="text-gray-500 text-sm">Learn your way</p>
        </div>

        {/* Right Section: Social Media Links & Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-4 text-gray-800">
            {[ 
              { href: "https://facebook.com", icon: <FaFacebookF size={20} /> },
              { href: "https://twitter.com", icon: <FaTwitter size={20} /> },
              { href: "https://instagram.com", icon: <FaInstagram size={20} /> },
              { href: "https://linkedin.com", icon: <FaLinkedinIn size={20} /> }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-transform transform hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Footer Links */}
          <nav className="flex gap-6 text-sm text-gray-500">
            {[
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="hover:text-gray-800 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center text-sm text-gray-700 border-t pt-4">
        &copy; {new Date().getFullYear()} Learnify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
