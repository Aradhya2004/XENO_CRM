const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

// Initialize GoogleGenAI with API Key
const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY
});

const generateCampaignSuggestions = async (req, res) => {
  const { campaignObjective, audienceDetails } = req.body;

  try {
    // Construct the prompt for Google AI
    const promptText = `
    You are an AI specialized in marketing. Based on the following details, generate:
    1. Two personalized message templates for the campaign.
    2. Audience segmentation rules for better targeting.

    Campaign Objective: ${campaignObjective}
    Audience Details: ${audienceDetails}

    Provide the response in JSON format:
    {
      "messageTemplates": ["Template 1", "Template 2"],
      "segmentationRules": ["Rule 1", "Rule 2"]
    }
    `;

    // ✅ Generate content using Gemini with simplified `contents`
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: promptText // Direct string as per documentation
    });

    // ✅ Extract the text response directly
    const responseText = result.text;

    if (!responseText) {
      console.error("No response text received from Google AI:", JSON.stringify(result, null, 2));
      return res.status(500).json({ message: "Failed to get a valid response from the AI." });
    }

    // 🔍 Clean the response and parse it
    const cleanResponse = responseText.replace(/```json|```/g, '').trim();
    let jsonResult;

    try {
      jsonResult = JSON.parse(cleanResponse);
      res.status(200).json(jsonResult);
    } catch (e) {
      console.error("Failed to parse AI response:", cleanResponse, e.message);
      return res.status(500).json({ message: "Failed to parse the AI response as JSON." });
    }

  } catch (error) {
    console.error("Google AI error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateCampaignSuggestions };
