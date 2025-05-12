import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CampaignCreation = () => {
  const [campaignName, setCampaignName] = useState("");
  const [rules, setRules] = useState([{ field: "", operator: "", value: "" }]);
  const navigate = useNavigate();

  // Handlers for Rules
  const handleRuleChange = (index, event) => {
    const values = [...rules];
    values[index][event.target.name] = event.target.value;
    setRules(values);
  };

  const addRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const removeRule = (index) => {
    const values = [...rules];
    values.splice(index, 1);
    setRules(values);
  };

  // **Submit Handler**
  const submitCampaign = (e) => {
    e.preventDefault();

    // Navigate to Preview Page with State
    navigate("/campaign-preview", {
      state: {
        campaignName,
        rules,
      },
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Campaign</h2>

      <form onSubmit={submitCampaign} className="bg-white p-6 rounded-lg shadow-md space-y-4">

        {/* Campaign Name */}
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Campaign Name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />

        {/* Dynamic Rules */}
        {rules.map((rule, index) => (
          <div key={index} className="grid grid-cols-4 gap-3 items-center">
            <input
              className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              name="field"
              placeholder="Field"
              value={rule.field}
              onChange={(e) => handleRuleChange(index, e)}
            />
            <select
              className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              name="operator"
              value={rule.operator}
              onChange={(e) => handleRuleChange(index, e)}
            >
              <option value="">Op</option>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="=">=</option>
              <option value="!=">!=</option>
            </select>
            <input
              className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              name="value"
              placeholder="Value"
              value={rule.value}
              onChange={(e) => handleRuleChange(index, e)}
            />
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded transition cursor-pointer"
              onClick={() => removeRule(index)}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addRule}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition cursor-pointer"
          >
            + Add Rule
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition cursor-pointer"
          >
            Preview & Confirm
          </button>
        </div>

      </form>
    </div>

  );
};

export default CampaignCreation;
