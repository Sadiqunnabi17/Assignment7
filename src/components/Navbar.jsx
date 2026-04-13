import { NavLink } from "react-router-dom";
import { FaHome, FaClock, FaChartPie } from "react-icons/fa";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-bold flex items-center gap-1"
      : "flex items-center gap-1";

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1 text-xl font-bold">KeenKeeper</div>

      <div className="flex gap-6">
        <NavLink to="/" className={linkClass}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/timeline" className={linkClass}>
          <FaClock /> Timeline
        </NavLink>
        <NavLink to="/stats" className={linkClass}>
          <FaChartPie /> Stats
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;