const CommunicationLog = require("../models/CommunicationLog");

const getCampaignAnalytics = async (req, res) => {
  const { campaignId } = req.params;

  try {
    // Get all logs for the specified campaign
    const logs = await CommunicationLog.find({ campaignId });

    // Calculate statistics
    const totalMessages = logs.length;
    const sentCount = logs.filter(log => log.status === "Sent").length;
    const failedCount = logs.filter(log => log.status === "Failed").length;
    const successRate = ((sentCount / totalMessages) * 100).toFixed(2);
    const failureRate = ((failedCount / totalMessages) * 100).toFixed(2);

    res.status(200).json({
      totalMessages,
      sentCount,
      failedCount,
      successRate,
      failureRate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCampaignAnalytics };
