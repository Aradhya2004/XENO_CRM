const Customer = require("../models/Customer");
const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");
const nodemailer = require("nodemailer");

require('dotenv').config();

const deliverCampaign = async (req, res) => {
  try {
    const { campaignId } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const customers = await Customer.find();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const logs = [];

    for (const customer of customers) {
      const personalizedMessage = `Hi ${customer.name},\n\nThis is a message from our ${campaign.name} campaign!\n\nThanks,\nYour Company`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: `Campaign: ${campaign.name}`,
        text: personalizedMessage,
      };

      let status = "Sent";
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        status = "Failed";
        console.error(`Failed to send to ${customer.email}:`, emailError);
      }

      const log = new CommunicationLog({
        campaignId: campaign._id,
        customerId: customer._id,
        status: status,
      });

      await log.save();
      logs.push(log);
    }

    res.status(200).json({ message: "Campaign delivered successfully", logs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
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