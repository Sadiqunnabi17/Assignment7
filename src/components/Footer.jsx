import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a2e1a] text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-500 tracking-wide">KeenKeeper</h2>
          <p className="text-md text-gray-400 mt-1">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most</p>
        </div>

        {/* Nav Links */}
        <div className="flex gap-8 text-md text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/timeline" className="hover:text-white transition">Timeline</Link>
          <Link to="/stats" className="hover:text-white transition">Stats</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-500">
          <a href="#" className="hover:text-white transition text-lg"><FaFacebook /></a>
          <a href="#" className="hover:text-white transition text-lg"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition text-lg"><FaInstagram /></a>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700"></div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          {/* Left: Copyright */}
          <p className="hover:text-white transition">© 2026 KeenKeeper. All rights reserved.</p>

          {/* Right: Legal Links */}
          <div className="text-md flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;