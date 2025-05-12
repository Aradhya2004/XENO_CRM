import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [logs, setLogs] = useState({});
  const [expandedCampaign, setExpandedCampaign] = useState(null);

  // Fetch campaigns from backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/campaigns`,
          { withCredentials: true }
        );
        setCampaigns(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCampaigns();
  }, []);

  const deliverCampaign = async (campaignId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/delivery/deliver`,
        { campaignId },
        { withCredentials: true }
      );

      alert("Campaign Delivered!");
      fetchLogs(campaignId);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLogs = async (campaignId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/delivery/logs/${campaignId}`,
        { withCredentials: true }
      );
      setLogs((prev) => ({ ...prev, [campaignId]: response.data }));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Toggle View Logs
  const toggleLogs = (campaignId) => {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null);
    } else {
      fetchLogs(campaignId);
      setExpandedCampaign(campaignId);
    }
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Campaign History</h2>
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#002d9c] text-white">
          <tr>
            <th className="border p-2">Campaign Name</th>
            <th className="border p-2">Rules</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <React.Fragment key={campaign._id}>
              <tr>
                <td className="border p-2">{campaign.name}</td>
                <td className="border p-2">
                  {campaign.rules.map((rule, index) => (
                    <div key={index}>
                      {rule.field} {rule.operator} {rule.value}
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  {new Date(campaign.createdAt).toLocaleString()}
                </td>
                <td className="border p-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                    onClick={() => deliverCampaign(campaign._id)}
                  >
                    Deliver Message
                  </button>
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => toggleLogs(campaign._id)}
                  >
                    {expandedCampaign === campaign._id ? "Hide Logs" : "View Logs"}
                  </button>
                  <a
                    href={`/analytics/${campaign._id}`}
                    className="bg-purple-600 text-white px-2 py-1 rounded ml-2"
                  >
                    View Analytics
                  </a>
                </td>
              </tr>

              {expandedCampaign === campaign._id && (
                <tr>
                  <td colSpan="4" className="border p-2 bg-gray-100">
                    <h3 className="text-lg font-semibold mb-2">Delivery Logs:</h3>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2">Customer ID</th>
                          <th className="border p-2">Status</th>
                          <th className="border p-2">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs[campaign._id]?.map((log) => (
                          <tr key={log._id}>
                            <td className="border p-2">{log.customerId}</td>
                            <td
                              className={`border p-2 ${log.status === "Sent" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                              {log.status}
                            </td>
                            <td className="border p-2">
                              {new Date(log.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignHistory;
