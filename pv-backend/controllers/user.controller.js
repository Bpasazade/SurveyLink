const db = require("../models");
const User = db.user;
const Company = db.company;
const Group = db.group;
const Campaign = db.campaign;
const Sms = db.sms;
const xlsx = require('xlsx');
const { v4: uuidv4 } = require("uuid");
const TargetUser = require("../models/target.user.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = async (req, res) => {
  try {
    // Assuming you have user authentication implemented and a user ID is available in req.user
    const userId = req.user._id;

    // Use your database model and query to retrieve the user's data
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the company name and number of screens from the user's data
    const companyName = user.companyName;
    const numberOfScreens = user.numberOfScreens;

    // Return the company name and number of screens as a response
    return res.status(200).json({ companyName, numberOfScreens });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// Create group
exports.createGroup = async (req, res) => {
  try {
    const { name, companyId } = req.body;
    const newGroup = new Group({
      name,
      company: companyId,
    });
    const savedGroup = await newGroup.save();
    return res.status(200).json(savedGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get groups by company id
exports.getGroups = async (req, res) => {
  try {
    const { companyId } = req.params;
    const groups = await Group.find({ company: companyId });
    return res.status(200).json(groups);
  } catch (error) {
    console.error('Error getting groups:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get group list
exports.getGroupList = async (req, res) => {
  try {
    const { companyId } = req.params;
    console.log(companyId);
    const groupList = await TargetUser.find({ company: companyId });
    console.log(groupList);
    return res.status(200).json(groupList);
  } catch (error) {
    console.error('Error getting group list:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, description, companyId, groupId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const status = 'pending';
    const newCampaign = new Campaign({
      name,
      description,
      company: companyId,
      group: groupId,
      status: status,
    });
    const savedCampaign = await newCampaign.save();
    return res.status(200).json(savedCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get campaigns by company id
exports.getCampaigns = async (req, res) => {
  try {
    const { companyId } = req.params;
    const campaigns = await Campaign.find({ company: companyId });
    return res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error getting campaigns:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { name, description, companyId } = req.body;
    console.log(campaignId, name, description, companyId);
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    campaign.name = name;
    campaign.description = description;
    campaign.company = companyId;
    const savedCampaign = await campaign.save();
    return res.status(200).json(savedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
const moment = require('moment');
// Create sms
exports.createSms = async (req, res) => {
  try {
    const { message, groupId, date, companyId,  } = req.body;
    console.log(message, date, companyId, groupId);
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm');
    const newSms = new Sms({
      message,
      date: formattedDate,
      groupId: groupId,
      companyId: companyId,
    });
    const savedSms = await newSms.save();
    return res.status(200).json(savedSms);
  } catch (error) {
    console.error('Error creating sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get sms by company id
exports.getSms = async (req, res) => {
  try {
    const { companyId } = req.params;
    const sms = await Sms.find({ company: companyId });
    return res.status(200).json(sms);
  } catch (error) {
    console.error('Error getting sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update sms
exports.updateSms = async (req, res) => {
  try {
    const { smsId } = req.params;
    const { message, date, companyId } = req.body;
    const sms = await Sms.findById(smsId);
    if (!sms) {
      return res.status(404).json({ message: 'Sms not found' });
    }
    sms.message = message;
    sms.date = date;
    sms.company = companyId;
    const savedSms = await sms.save();
    return res.status(200).json(savedSms);
  } catch (error) {
    console.error('Error updating sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Accounts
exports.getUsersByCompanyId = async (req, res) => {
  try {
    console.log(req.params.companyId);
    const users = await User.find({ company: req.params.companyId });
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Excel file upload
exports.uploadExcelFile = async (req, res, file) => {
  try {
      const { companyId, groupId } = req.body;
      if (file == undefined) {
          return res.status(400).send("Please upload an excel file!");
      }
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Get column headers dynamically
      const columnHeaders = ['name', 'phoneNumber', 'location'];

      // Process each row
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: columnHeaders });

      const enrichedData = jsonData.map((user) => ({
          id: uuidv4(),
          company: companyId,
          group: groupId,
          ...user,
      }));

      // Save the data in the database
      await TargetUser.insertMany(enrichedData);
      return res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (error) {
      console.error('Error uploading excel file:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
}