const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Company = db.company;
const Group = db.group;
const Campaign = db.campaign;

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

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, description, companyId, groupId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const newCampaign = new Campaign({
      name,
      description,
      company: company,
    });
    const savedCampaign = await newCampaign.save();
    return res.status(200).json(savedCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}