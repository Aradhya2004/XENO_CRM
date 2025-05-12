import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const CampaignAnalytics = () => {
  const { campaignId } = useParams();
  const [analyticsData, setAnalyticsData] = useState(null);

  // Fetch Analytics Data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/analytics/${campaignId}`, {
          withCredentials: true,
        });
        setAnalyticsData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAnalytics();
  }, [campaignId]);

  const COLORS = ["#00C49F", "#FF8042"];

  const data = [
    { name: "Sent", value: analyticsData?.sentCount || 0 },
    { name: "Failed", value: analyticsData?.failedCount || 0 },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Campaign Analytics</h2>

      {analyticsData ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Delivery Statistics:</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Total Messages: {analyticsData.totalMessages}</li>
            <li>Sent: {analyticsData.sentCount}</li>
            <li>Failed: {analyticsData.failedCount}</li>
            <li>Success Rate: {analyticsData.successRate}%</li>
            <li>Failure Rate: {analyticsData.failureRate}%</li>
          </ul>

          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx={200}
              cy={150}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p>Loading Analytics...</p>
      )}
    </div>
  );
};

export default CampaignAnalytics;
