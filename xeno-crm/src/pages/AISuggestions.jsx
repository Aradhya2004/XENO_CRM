import { useState } from "react";
import axios from "axios";

const AISuggestions = () => {
  const [campaignObjective, setCampaignObjective] = useState("");
  const [audienceDetails, setAudienceDetails] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ai/suggestions`,
        {
          campaignObjective,
          audienceDetails,
        },
        {
          withCredentials: true,
        }
      );

      const { messageTemplates, segmentationRules } = response.data;

      setSuggestions({
        messageTemplates,
        segmentationRules: segmentationRules || [],
      });

      alert("AI Suggestions Applied!");
    } catch (error) {
      console.error("Request failed with status code 401 - Unauthorized");
      alert("You are not authorized. Please login to access this feature.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to Clipboard!");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">AI-Powered Campaign Suggestions</h2>
      <form onSubmit={fetchSuggestions} className="bg-white p-6 rounded-lg shadow-md">
        <textarea
          className="w-full mb-4 p-2 border"
          placeholder="Campaign Objective (e.g., Bring back inactive users)"
          value={campaignObjective}
          onChange={(e) => setCampaignObjective(e.target.value)}
        />
        <textarea
          className="w-full mb-4 p-2 border"
          placeholder="Audience Details (e.g., Age group 25-40, inactive for 3 months)"
          value={audienceDetails}
          onChange={(e) => setAudienceDetails(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Fetching Suggestions..." : "Get Suggestions"}
        </button>
      </form>

      {suggestions && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Generated Suggestions:</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="font-semibold">Message Templates:</h4>
            <ul className="list-disc pl-5">
              {suggestions.messageTemplates.map((template, index) => (
                <li key={index} className="mb-4 p-3 bg-white rounded-md shadow-md">
                  <div className="flex justify-between items-start">
                    <p>{template}</p>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                      onClick={() => copyToClipboard(template)}
                    >
                      Copy
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {suggestions.segmentationRules.length > 0 && (
              <>
                <h4 className="font-semibold mt-4">Segmentation Rules:</h4>
                <ul className="list-disc pl-5">
                  {suggestions.segmentationRules.map((rule, index) => (
                    <li key={index} className="mb-2 p-3 bg-white rounded-md shadow-md">
                      {rule}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;
