const db = require('../models');
const TargetUser = require('../models/target.user.model');
const Company = db.company;
const Campaign = db.campaign;
const path = require('path');
const multer = require('multer');
const authConfig = require('../config/auth.config');
const secret_key = authConfig.secret;

exports.registerCompany = async (req, res) => {

    const company = new Company({
        name: req.body.companyName,
        address: req.body.companyAddress,
        users: []
    });

    company.save((err, company) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: 'Company was registered successfully!' });
    });
}

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.status(200).json(companies);
    } catch (error) {
        console.error('Error retrieving companies:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        return res.status(200).json(company);
    } catch (error) {
        console.error('Error retrieving company:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getCompanyByName = async (req, res) => {
    try {
        const companyName = req.params.name;
        const id = req.query.id;
        const company = await Company.find({ name: companyName });
        let user = await TargetUser.find({ _id: id, company: company[0]._id });
        if (user.length == 0) {
            res.status(404).send({ message: "Not found TargetUser with id " + id });
        }
        return res.status(200).json(company);
    } catch (error) {
        console.error('Error retrieving company:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const { _id } = req.params;
        const { editedCompany } = req.body;
        console.log(_id);
        console.log(editedCompany);
        const company = await Company.findByIdAndUpdate(_id, { name: editedCompany.name, address: editedCompany.address }, { new: true });
        return res.status(200).json(company);
    } catch (error) {
        console.error('Error updating company:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByIdAndDelete(id);
        return res.status(200).json(company);
    } catch (error) {
        console.error('Error deleting company:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        return res.status(200).json(campaigns);
    } catch (error) {
        console.error('Error retrieving campaigns:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../templates'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Set up multer upload middleware
const upload = multer({ storage: storage });

exports.checkToken = (req, res, next) => {
    const { token } = req.query;

    console.log('Route hit:', req.originalUrl);
    console.log('Token:', token);
    console.log('Secret key:', secret_key);
    if (token !== secret_key) {
        return res.status(403).send({ message: 'Invalid secret key for template upload.' });
    }

    next();
};

// File upload route
exports.uploadTemplate = async (req, res) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        return res.status(200).send({ message: 'Template uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading template:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get Actions
exports.getActions = async (req, res) => {
    try {
        const actions = await db.action.find();
        return res.status(200).json(actions);
    } catch (error) {
        console.error('Error retrieving actions:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all sent sms
exports.getAllSentSms = async (req, res) => {
    try {
        const campaigns = await db.campaign.find();
        let sentSms = 0;
        campaigns.forEach(campaign => {
            sentSms += campaign.sentSms;
        })
        return res.status(200).json(sentSms);
    } catch (error) {
        console.error('Error retrieving sent sms:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all video watched target user answer
exports.getAllVideoWatched = async (req, res) => {
    try {
        const responses = await db.response.find();
        let videoWatched = 0;
        responses.forEach(response => {
            if (response.answer.includes('video')) {
                videoWatched++;
            }
        })
        return res.status(200).json(videoWatched);
    } catch (error) {
        console.error('Error retrieving video watched:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
 

// Get all answer count
exports.getAllAnswerCount = async (req, res) => {
    try {
        const responses = await db.response.find();
        let answerCount = 0;
        responses.forEach(response => {
            if(response.answer.includes('option')) {
                answerCount++;
            }
        })
        return res.status(200).json(answerCount);
    } catch (error) {
        console.error('Error retrieving answer count:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}