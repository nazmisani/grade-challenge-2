import { FaUtensils, FaThList, FaUserPlus, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to={"/"} className="rounded-full bg-white text-gray-800 p-2">
              <FaUtensils className="text-2xl" />
            </Link>
            <h1 className="text-2xl font-bold tracking-wide">Flavor of the World</h1>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to={"/"} className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
              <FaUtensils />
              <span>Cuisines</span>
            </Link>
            <Link to={"/categories"} className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
              <FaThList />
              <span>Categories</span>
            </Link>
            <Link to={"/add-user"} className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
              <FaUserPlus />
              <span>Add User</span>
            </Link>
          </div>

          {/* User Dropdown */}
          <details className="relative group">
            <summary className="flex items-center bg-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring focus:ring-gray-500">
              <FaUser className="text-xl" />
              <span className="ml-2">User</span>
              <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md opacity-0 invisible group-open:opacity-100 group-open:visible transition duration-300">
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 transition duration-300">
                Log out
              </button>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
