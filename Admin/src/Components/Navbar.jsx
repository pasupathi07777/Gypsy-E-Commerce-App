import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";

const Navbar = () => {
  const menuItems = [
    { name: "Dashboard", href: "/", icon: <MdDashboard size={20} /> },
    { name: "All Users", href: "/all-users", icon: <FaUser size={20} /> },
    {
      name: "Products",
      href: "/all-products",
      icon: <MdOutlineProductionQuantityLimits size={20} />,
    },
    { name: "Orders", href: "/orders", icon: <MdLocalShipping size={20} /> },
  ];

  return (
    <div className="h-screen w-56 bg-gray-200 text-black flex flex-col">
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-400">
        Admin Panel
      </h2>
      <ul className="mt-6 space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              className="flex items-center gap-4 px-6 py-3 text-sm rounded-lg w-[70%] font-semibold mx-auto focus:bg-white transition shadow-lg hover:shadow-xl hover:bg-gray-100"
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
