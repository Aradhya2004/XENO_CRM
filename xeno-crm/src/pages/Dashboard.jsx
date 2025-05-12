import { Link } from "react-router-dom";

const Dashboard = () => {
  const dashboardItems = [
    { label: "Data Ingestion", image: "/icons/user.png", path: "/ingestion" },
    { label: "Order List", image: "/icons/order.png", path: "/orders" },
    { label: "Campaign Creation", image: "/icons/campaign.png", path: "/create-campaign" },
    { label: "Campaign History", image: "/icons/history.png", path: "/campaign-history" },
    { label: "AI Suggestions", image: "/icons/AI.png", path: "/ai-suggestions" },
  ];

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
