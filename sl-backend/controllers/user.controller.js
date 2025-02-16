const db = require("../models");
const User = db.user;
const Company = db.company;
const Group = db.group;
const Campaign = db.campaign;
const Sms = db.sms;
const Action = db.action;
const xlsx = require('xlsx');
const { v4: uuidv4 } = require("uuid");
const TargetUser = require("../models/target.user.model");
const mongoose = require('mongoose');
const Template = require("../models/template.model");
const Response = require("../models/response.model");
const apiConfig = require("../config/api.config");
const key = apiConfig.SMS_API_KEY;
const fs = require('fs');

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
    let smsApiResponse = await createGroupSmsApi(name);
    console.log('smsApiResponse', smsApiResponse);
    smsApiResponse = JSON.parse(smsApiResponse);
    console.log('smsApiResponse', smsApiResponse);
    const newGroup = new Group({
      name,
      company: companyId,
      panelGroupID: smsApiResponse.groupID,
    });
    const savedGroup = await newGroup.save();
    const company = await Company.findById(companyId);
    const action = new Action({
      date: new Date().toISOString().slice(0, 10),
      day: new Date().toISOString().slice(0, 10),
      action: 'Grup Oluşturdu',
      company: company.name,
    });
    await action.save();
    return res.status(200).json({ savedGroup, smsApiResponse });
  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Create group in Mesaj API
const axios = require('axios');
const qs = require('qs');
async function createGroupSmsApi(name) {
  try {
    const mesajApiUrl = 'https://api.mesajpaneli.com/json_api/group/createGroup';
    // Prepare the data for the Mesaj API request
    var postData = {
      user: {
        hash: key,
      },
      groupName: name,  
    };

    // Encode the data variable
    var jsonData = JSON.stringify(postData);
    var baseData = btoa(jsonData);

    // Make the Mesaj API request
    const response = await axios.post(mesajApiUrl, qs.stringify({ data: baseData }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the Mesaj API response
    console.log('Mesaj API response:', response.data);
    decodedData = Buffer.from(response.data, 'base64').toString('ascii');
    console.log('decodedData', decodedData);
    return decodedData;
  } catch (error) {
    console.error('Error saving group to Mesaj API:', error);
    throw error;
  }
}

// Delete group
exports.deleteGroup = async (req, res) => {
  try {
    const { panelGroupID, groupId } = req.params;
    const group = await Group.findByIdAndDelete(groupId);
    const targetUser = await TargetUser.deleteMany({ group: groupId });
    const smsApiResponse = await deleteGroupSmsApi(panelGroupID);
    return res.status(200).json({ group, smsApiResponse, targetUser });
  } catch (error) {
    console.error('Error deleting group:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete group in Mesaj API
async function deleteGroupSmsApi(panelGroupID) {
  try {
    const mesajApiUrl = 'https://api.mesajpaneli.com/json_api/group/deleteGroup';
    // Prepare the data for the Mesaj API request
    var postData = {
      user: {
        hash: key,
      },
      groupID: panelGroupID,
    };

    // Encode the data variable
    var jsonData = JSON.stringify(postData);
    var baseData = btoa(jsonData);

    // Make the Mesaj API request
    const response = await axios.post(mesajApiUrl, qs.stringify({ data: baseData }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the Mesaj API response
    console.log('Mesaj API response:', response.data);
    decodedData = Buffer.from(response.data, 'base64').toString('ascii');
    console.log('decodedData', decodedData);
    return decodedData;
  } catch (error) {
    console.error('Error saving group to Mesaj API:', error);
    throw error; // Propagate the error back to the calling function
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

// Get Company Target List
exports.getCompanyTargetList = async (req, res) => {
  try {
    const { companyId } = req.params;
    const groupList = await TargetUser.find({ company: companyId });
    return res.status(200).json(groupList);
  } catch (error) {
    console.error('Error getting group list:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get Group Target List
exports.getGroupTargetList = async (req, res) => {
  try {
    const { campaign, groups } = req.query;
    const groupIds = Object.values(groups).map(groupId => new mongoose.Types.ObjectId(groupId));

    // aggregate to gather all answers for each target user
    let result = await TargetUser.aggregate([
      {
        $match: { group: { $in: groupIds } }
      },
      {
        $lookup: {
          from: 'responses',
          localField: '_id',
          foreignField: 'targetUser',
          as: 'answers'
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          phoneNumber: { $first: '$phoneNumber' },
          location: { $first: '$location' },
          group: { $first: '$group' },
          company: { $first: '$company' },
          answers: { $push: '$answers' }
        }
      }
    ]);
    result = result.sort((a, b) => a.name.localeCompare(b.name));
    if (result.length == 0) {
      return res.status(404).json({ message: 'Target users not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting group list:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get target user by id
exports.getTargetUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const targetUser = await TargetUser.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }
    return res.status(200).json(targetUser);
  } catch (error) {
    console.error('Error getting target user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update group
exports.updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, companyId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    group.name = name;
    group.company = companyId;
    const savedGroup = await group.save();
    return res.status(200).json(savedGroup);
  } catch (error) {
    console.error('Error updating group:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { templateName, name, description, companyId, groups } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const status = 'pending';
    const newCampaign = new Campaign({
      name,
      date: new Date().toISOString().slice(0, 10),
      templateName,
      description,
      company: companyId,
      groups: groups,
      sentSms: 0,
      status: status,
    });
    const savedCampaign = await newCampaign.save();
    const action = new Action({
      date: new Date().toISOString().slice(0, 10),
      day: new Date().toISOString().slice(0, 10),
      action: 'Kampanya Oluşturdu',
      company: company.name,
    });
    await action.save();
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

exports.getCampaignByName = async (req, res) => {
  try {
    const campaignName = req.params.name;
    const company = req.query.company;
    let campaign = await Campaign.find({ company: company, name: campaignName });
    if (campaign.length == 0) {
      res.status(404).send({ message: "Not found campaign with id " + id });
    }
    return res.status(200).json(campaign);
  } catch (error) {
    console.error('Error retrieving campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getCampaignById = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    let campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).send({ message: "Not found campaign with id " + id });
    }
    return res.status(200).json(campaign);
  } catch (error) {
    console.error('Error retrieving campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { name, description, companyId, groups } = req.body;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    campaign.name = name;
    campaign.description = description;
    campaign.company = companyId;
    campaign.groups = groups;
    const savedCampaign = await campaign.save();
    return res.status(200).json(savedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update campaign status
exports.updateCampaignStatus = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { status } = req.body;
    const { sentUserCount } = req.body;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    campaign.status = status;
    campaign.sentSms += sentUserCount;
    const savedCampaign = await campaign.save();
    console.log('savedCampaign', savedCampaign);
    return res.status(200).json(savedCampaign);
  } catch (error) {
    console.error('Error updating campaign status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findByIdAndDelete(campaignId);
    const responses = await Response.deleteMany({ campaign: campaignId });
    return res.status(200).json(campaign);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Create sms
exports.createSms = async (req, res) => {
  try {
    const { title, message, campaignId, groupId, companyId,  } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const newSms = new Sms({
      title,
      message,
      campaignId,
      groupId: groupId,
      companyId: companyId,
      sent: false,
    });
    const savedSms = await newSms.save();

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    campaign.groups.push(groupId);
    const savedCampaign = await campaign.save();
    const action = new Action({
      date: new Date().toISOString().slice(0, 10),
      day: new Date().toISOString().slice(0, 10),
      action: 'Sms Oluşturdu',
      company: company.name,
    });
    await action.save();
    return res.status(200).json({ savedSms, savedCampaign });
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
    const { message, group, companyId, campaignId } = req.body;
    const sms = await Sms.findById(smsId);
    if (!sms) {
      return res.status(404).json({ message: 'Sms not found' });
    }
    sms.message = message;
    sms.groupId = group;
    sms.companyId = companyId;
    sms.campaignId = campaignId;
    const savedSms = await sms.save();
    return res.status(200).json(savedSms);
  } catch (error) {
    console.error('Error updating sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete sms
exports.deleteSms = async (req, res) => {
  try {
    const { smsId } = req.params;
    const sms = await Sms.findByIdAndDelete(smsId);
    return res.status(200).json(sms);
  } catch (error) {
    console.error('Error deleting sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Accounts
exports.getUsersByCompanyId = async (req, res) => {
  try {
    const users = await User.find({ company: req.params.companyId });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};


// Send sms
exports.sendSms = async (req, res) => {
  try {
    const { message, phoneNumbers, date, sms } = req.body;

    // Mesaj Paneli API
    const mesajApiUrl = 'https://api.mesajpaneli.com/json_api/';
    const smsData = {
      user: {
        hash: key,
      },
      msgBaslik: 'SurveyLink',
      tr: true,
      start: date,
      msgData: message,
    };
    const jsonData = JSON.stringify(smsData);
    const baseData = Buffer.from(jsonData).toString('base64');

    const response = await axios.post(mesajApiUrl, qs.stringify({ data: baseData }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the Mesaj API response
    console.log('Mesaj API response:', response.data);
    decodedData = Buffer.from(response.data, 'base64').toString('ascii');
    console.log('decodedData', decodedData);

    // Update sms status
    const smsF = await Sms.findById(sms._id);
    smsF.sent = true;
    const savedSms = await smsF.save();

    return res.status(200).json({ savedSms, decodedData });
  } catch (error) {
    console.error('Error sending sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get sent sms by company id
exports.getSentSms = async (req, res) => {
  try {
    const { companyId } = req.params;
    const campaigns = await Campaign.find({ status: 'sent', company: companyId });
    // get all campaigns' sentSms and sum them
    const sentSms = campaigns.reduce((acc, campaign) => acc + campaign.sentSms, 0);
    return res.status(200).json(sentSms);
  } catch (error) {
    console.error('Error getting sent sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getCampaignSentSms = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const sms = await Sms.find({ campaignId: campaignId, status: 'sent' });
    console.log('sms', sms);
    const groupIds = sms.map(sms => sms.groupId);
    const targetUsers = await TargetUser.find({ group: { $in: groupIds } });
    const campaign = await Campaign.find({ status: 'sent', _id: campaignId });
    campaign[0].sentSms = targetUsers.length;
    const savedCampaign = await campaign[0].save();
    console.log('targetUsers.length', targetUsers.length);
    return res.status(200).json(targetUsers.length);
  } catch (error) {
    console.error('Error getting sent sms:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const batchSize = 100;
exports.uploadExcelFile = async (req, res, file) => {
    try {
        const { companyId, groupId, panelGroupID } = req.body;
        if (file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path = "excelUploads/" + req.file.filename;

        const workbook = xlsx.readFile(path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const columnHeaders = ['name', 'phoneNumber', 'location'];

        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: columnHeaders });

        // Split jsonData into batches
        const batches = [];
        for (let i = 0; i < jsonData.length; i += batchSize) {
            const batch = jsonData.slice(i, i + batchSize);
            batches.push(batch);
        }

        // Process each batch and insert into the database
        for (const batch of batches) {
            const enrichedData = batch.map((user) => ({
                id: uuidv4(),
                company: mongoose.Types.ObjectId(companyId),
                group: mongoose.Types.ObjectId(groupId),
                ...user,
            }));

            await TargetUser.insertMany(enrichedData);

            // Add target users to Sms API
            for (const user of enrichedData) {
              console.log('user', user);
              await addTargetUserSmsApi(user.name, user.phoneNumber, user.location, panelGroupID);
            }
        }

        // delete uploaded file from server
        fs.unlinkSync(req.file.path);

        return res.status(200).json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading excel file:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add target user to Sms API
async function addTargetUserSmsApi(name, phoneNumber, location, panelGroupID) {
  try {
    console.log(name + ' ' + phoneNumber + ' ' + location + ' ' + panelGroupID);
    const mesajApiUrl = 'https://api.mesajpaneli.com/json_api/group/addContact';
    // Prepare the data for the Mesaj API request
    var postData = {
      user: {
        hash: key,
      },
      groupID: panelGroupID,
      rows: [
        {
          numara: phoneNumber,
          ad: name.split(' ')[0],
          soyad: name.split(' ')[1],
          sehir: location,
        }
      ],
    };

    // Encode the data variable
    var jsonData = JSON.stringify(postData);
    var baseData = Buffer.from(jsonData).toString('base64');

    // Make the Mesaj API request
    const response = await axios.post(mesajApiUrl, qs.stringify({ data: baseData }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the Mesaj API response
    console.log('Mesaj API response:', response.data);
    decodedData = Buffer.from(response.data, 'base64').toString('ascii');
    console.log('decodedData', decodedData);
    return decodedData;
  } catch (error) {
    console.error('Error saving group to Mesaj API:', error);
    throw error;
  }
}

exports.createTargetUser = async (req, res) => {
  try {
    const { name, phoneNumber, location, group, company, panelGroupID } = req.body;
    const newTargetUser = new TargetUser({
      id: uuidv4(),
      name,
      phoneNumber,
      location,
      group,
      company,
      panelGroupID,
    });
    const savedTargetUser = await newTargetUser.save();
    const smsApiResponse = await addTargetUserSmsApi(name, phoneNumber, location, panelGroupID);
    return res.status(200).json({ savedTargetUser, smsApiResponse });
  } catch (error) {
    console.error('Error creating target user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete target user
exports.deleteTargetUser = async (req, res) => {
  try {
    const targetUser = await TargetUser.deleteOne({ _id: req.body.targetUserId, group: req.body.groupId }); 
    const smsApiResponse = await deleteTargetUserSmsApi(req.body.panelGroupID, req.body.phoneNumber);
    return res.status(200).json({ smsApiResponse });
  } catch (error) {
    console.error('Error deleting target user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete target user in Mesaj API
async function deleteTargetUserSmsApi(panelGroupID, phoneNumber) {
  try {
    const mesajApiUrl = 'https://api.mesajpaneli.com/json_api/group/removeContact';
    var postData = {
      user: {
        hash: key,
      },
      groupID: panelGroupID,
      numara: [
        phoneNumber
      ],
    };

    // Encode the data variable
    var jsonData = JSON.stringify(postData);
    var baseData = Buffer.from(jsonData).toString('base64');

    // Make the Mesaj API request
    const response = await axios.post(mesajApiUrl, qs.stringify({ data: baseData }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the Mesaj API response
    console.log('Mesaj API response:', response.data);
    decodedData = Buffer.from(response.data, 'base64').toString('ascii');
    console.log('decodedData', decodedData);
    return decodedData;
  } catch (error) {
    console.error('Error saving group to Mesaj API:', error);
    throw error; // Propagate the error back to the calling function
  }
}

// Edit target user
exports.updateTargetUser = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const { editedUser } = req.body;
    console.log('targetUserId', targetUserId);
    console.log('editedUser', editedUser.name);
    const targetUser = await TargetUser.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }
    targetUser.name = editedUser.name;
    targetUser.phoneNumber = editedUser.phoneNumber;
    targetUser.location = editedUser.location;
    targetUser.group = editedUser.group;
    targetUser.company = editedUser.company;
    const savedTargetUser = await targetUser.save();
    const smsApiResponse = await updateTargetUserSmsApi(targetUser);
    return res.status(200).json({ savedTargetUser, smsApiResponse });
  } catch (error) {
    console.error('Error editing target user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Target User in Mesaj API
async function updateTargetUserSmsApi(targetUser) {
  console.log('targetUser', targetUser);
  try {
    const mesajApiUrl = 'https://api.mesajpaneli.com/json_api/group/editContactByNumber';
    var postData = {
      user: {
        hash: key,
      },
      groupID: targetUser.panelGroupID,
      search: targetUser.phoneNumber,
      changes: {
        ad: targetUser.name.split(' ')[0],
        soyad: targetUser.name.split(' ')[1],
        sehir: targetUser.location,
      },
    };

    // Encode the data variable
    var jsonData = JSON.stringify(postData);
    var baseData = Buffer.from(jsonData).toString('base64');

    // Make the Mesaj API request
    const response = await axios.post(mesajApiUrl, qs.stringify({ data: baseData }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return the Mesaj API response
    console.log('Mesaj API response:', response.data);
    decodedData = Buffer.from(response.data, 'base64').toString('ascii');
    console.log('decodedData', decodedData);
    return decodedData;
  } catch (error) {
    console.error('Error deleting target user:', error);
    throw error; 
  }
}

// Create template
exports.createTemplate = async (req, res) => {
  try {
    const { name, campaign, options } = req.body;
    const newTemplate = new Template({
      name,
      campaign,
      options,
    });
    const savedTemplate = await newTemplate.save();
    return res.status(200).json(savedTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get template
exports.getTemplate = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const template = await Template.findOne({ campaign: mongoose.Types.ObjectId(campaignId) });
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    return res.status(200).json(template);
  } catch (error) {
    console.error('Error getting template:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({});
    return res.status(200).json(templates);
  } catch (error) {
    console.error('Error getting templates:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}