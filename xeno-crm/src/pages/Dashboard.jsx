import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const dashboardItems = [
    { label: "Data Ingestion", image: "/icons/user.png", path: "/ingestion" },
    { label: "Order List", image: "/icons/order.png", path: "/orders" },
    { label: "Campaign Creation", image: "/icons/campaign.png", path: "/create-campaign" },
    { label: "Campaign History", image: "/icons/history.png", path: "/campaign-history" },
    { label: "AI Suggestions", image: "/icons/AI.png", path: "/ai-suggestions" },
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
          withCredentials: true,
        });
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("User not authenticated", error.response?.status);
        navigate("/"); // redirect to login
      }
    };
    getUser();
  }, [navigate]);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-20 h-20 mx-auto mb-4">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <h2 className="text-lg font-semibold text-center text-gray-700 group-hover:text-blue-600 transition-colors">
              {item.label}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
