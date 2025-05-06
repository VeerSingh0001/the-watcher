import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex gap-5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `w-30 text-sm h-10 flex items-center justify-center rounded-2xl hover:bg-gray-800 ${
            isActive ? "bg-white text-black" : "bg-gray-900 text-white"
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          `w-30 text-sm h-10 flex items-center justify-center rounded-2xl hover:bg-gray-800 ${
            isActive ? "bg-white text-black" : "bg-gray-900 text-white"
          }`
        }
      >
        Analytics
      </NavLink>
    </nav>
  );
}
