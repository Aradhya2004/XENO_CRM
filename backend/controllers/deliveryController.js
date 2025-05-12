const Customer = require("../models/Customer");
const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");

// Dummy Vendor API simulation
const sendMessageToCustomer = (customer) => {
  // Simulate a 90% success rate
  const isSuccess = Math.random() < 0.9;
  return isSuccess ? "Sent" : "Failed";
};

const deliverCampaign = async (req, res) => {
  const { campaignId } = req.body;

  try {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Fetch customers - Here, you might apply segmentation logic if needed.
    const customers = await Customer.find();

    const logs = await Promise.all(
      customers.map(async (customer) => {
        const status = sendMessageToCustomer(customer);

        const log = new CommunicationLog({
          campaignId: campaign._id,
          customerId: customer._id,
          status: status,
        });

        await log.save();
        return log;
      })
    );

    res.status(200).json({ message: "Campaign delivered successfully", logs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getLogs = async (req, res) => {
    const { campaignId } = req.params;
    try {
      const logs = await CommunicationLog.find({ campaignId }).sort({ createdAt: -1 });
      res.status(200).json(logs);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { deliverCampaign, getLogs };
