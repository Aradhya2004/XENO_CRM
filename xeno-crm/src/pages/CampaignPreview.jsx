import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CampaignPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { campaignName, rules } = state;

  // Submit to Backend
  const confirmCampaign = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/campaigns", {
        name: campaignName,
        rules: rules,
      }, { withCredentials: true });

      alert("Campaign Created Successfully!");
      navigate("/campaign-history");
    } catch (error) {
      console.error(error.message);
      alert("Error creating campaign.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Preview & Confirm Campaign</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Campaign Name:</h3>
        <p>{campaignName}</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Segmentation Rules:</h3>
        <ul className="list-disc pl-5">
          {rules.map((rule, index) => (
            <li key={index}>
              {rule.field} {rule.operator} {rule.value}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-x-4">
          <button
            onClick={confirmCampaign}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirm & Submit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
