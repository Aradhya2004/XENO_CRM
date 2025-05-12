import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const navItems = [
    { label: "Dashboard", icon: "/icons/dashboard.svg", path: "/dashboard" },
    { label: "Data Ingestion", icon: "/icons/user.png", path: "/ingestion" },
    { label: "Order List", icon: "/icons/order.png", path: "/orders" },
    { label: "Campaign Creation", icon: "/icons/campaign.png", path: "/create-campaign" },
    { label: "Campaign History", icon: "/icons/history.png", path: "/campaign-history" },
    { label: "AI Suggestions", icon: "/icons/AI.png", path: "/ai-suggestions" },
];

function Sidebar() {
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
        <div className="w-64 h-full bg-gray-600 text-white p-4 hidden md:flex flex-col justify-between overflow-y-auto">
            <div>
                <h2 className="text-2xl mt-5 mb-5 text-center">My Dashboard</h2>
                <ul className="space-y-4">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
                        >
                            <img src={item.icon} alt={item.label} className="w-10 h-10" />
                            <Link to={item.path} className="flex-1">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-gray-500 pt-4 flex items-center gap-2">
                <img
                    src={user?.profilePic || "/icons/user.png"}
                    onError={(e) => (e.target.src = "/icons/user.png")}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                    <p className="text-sm font-semibold truncate">
                        {user?.name || "Guest User"}
                    </p>
                </div>
                <FaSignOutAlt
                    className="w-6 h-6 cursor-pointer text-white hover:text-red-400"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
}

export default Sidebar;
