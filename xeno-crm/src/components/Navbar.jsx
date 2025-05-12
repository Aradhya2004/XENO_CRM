import { FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.status, error.response?.data || error.message);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">XENO CRM</h1>
        </div>

        {/* Show profile + logout on small screens when sidebar is hidden */}
        <div className="md:hidden flex items-center gap-4">
          <img
            src={user?.profilePic || "/icons/user.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => (e.target.src = "/icons/user.png")}
          />
          <FaSignOutAlt
            className="w-6 h-6 cursor-pointer hover:text-red-400"
            onClick={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
