const { mongo } = require('mongoose');
const db = require('../models');
const mongoose = require('mongoose');
const TargetUser = db.targetUser;
const Company = db.company;
const Campaign = db.campaign;
const Response = db.response;

exports.getUserPage = (req, res) => {
    const id = req.params.id;
    const company = req.params.company;
    const campaign = req.params.campaign;

    Company.findOne({ name: company })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found Company with name " + company });
            }
        })
    
    Campaign.findOne({ name: campaign })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found Campaign with name " + campaign });
            }
        }
    )

    TargetUser.findOne({ _id: mongo.ObjectId(id) })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id });
            } else {
                res.render('index', { user: data });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving TargetUser with id=" + id });
        });
};

exports.getUser = (req, res) => {
    try {
        const id = req.params.id;
        TargetUser.findOne({ _id: mongo.ObjectId(id) })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found TargetUser with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving TargetUser with id=" + id });
            });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getTargetGSMByGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        console.log(groupId);
        const targetUsers = await TargetUser.find({ group: groupId });
        //console.log(targetUsers);
        let targetGSM = [];
        targetUsers.forEach(targetUser => {
            let object = {};
            object['id'] = targetUser._id;
            object['phoneNumber'] = targetUser.phoneNumber;
            targetGSM.push(object);
        });
        res.send(targetGSM);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.saveAnswer = async (req, res) => {
    try {
        // Get id, company, campaign, answer from data
        const date = req.query.date;
        const id = req.query.id;
        const company = req.query.company;
        const campaign = req.query.campaign;
        const answer = req.query.answer;

        // Check if the Company exists
        const companyData = await Company.findOne({ _id: mongo.ObjectId(company) });
        if (!companyData) {
            return res.status(404).json({ message: "Not found Company with name " + company });
        }

        // Check if the Campaign exists
        const campaignData = await Campaign.findOne({ _id: mongo.ObjectId(campaign) });
        if (!campaignData) {
            return res.status(404).json({ message: "Not found Campaign with name " + campaign });
        }

        // Check if the TargetUser exists
        const targetUserData = await TargetUser.findOne({ _id: mongo.ObjectId(id) });
        if (!targetUserData) {
            return res.status(404).json({ message: "Not found user with id " + id });
        }

        // Save the Response
        const response = new Response({
            date,
            targetUser: id,
            campaign,
            company,
            answer,
            timestamp: new Date()
        });

        const savedResponse = await response.save();
        return res.status(200).json(savedResponse);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

exports.getSurveyStats = async (req, res) => {
    try {
        // Get company and campaign from data
        const company = req.query.company;
        const campaign = req.query.campaign;

        // Check if the Company exists
        const companyData = await Company.findOne({ _id: mongo.ObjectId(company) });
        if (!companyData) {
            return res.status(404).json({ message: "Not found Company with name " + company });
        }

        // Check if the Campaign exists
        const campaignData = await Campaign.findOne({ _id: mongo.ObjectId(campaign) });
        if (!campaignData) {
            return res.status(404).json({ message: "Not found Campaign with name " + campaign });
        }

        // Get the number of users who have opened the survey
        const surveyView = await Response.countDocuments({ campaign, company, answer: 'page-opened' });

        // Get the number of users who have seen the video intro
        const videoIntroSeen = await Response.countDocuments({ campaign, company, answer: 'video-played' });

        // Get the number of users who have watched the whole video
        const videoWatched = await Response.countDocuments({ campaign, company, answer: 'video-ended' });
        
        // Get the number of users who have answered yes to the question
        const yes = await Response.countDocuments({ campaign, company, answer: 'yes' });
        
        // Get the number of users who have answered no to the question
        const no = await Response.countDocuments({ campaign, company, answer: 'no' });

        // Get the number of users who have have seen video yes
        const videoYesSeen = await Response.countDocuments({ campaign, company, answer: 'video-yes-started' });

        // Get the number of users who have have seen video no
        const videoNoSeen = await Response.countDocuments({ campaign, company, answer: 'video-no-started' });

        return res.status(200).json({ surveyView, videoIntroSeen, videoWatched, yes, no, videoYesSeen, videoNoSeen });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

exports.getAllSurveyStats = async (req, res) => {
    try {
        // Get company and campaign from data
        const company = req.query.company;

        // Check if the Company exists
        const companyData = await Company.findOne({ _id: mongo.ObjectId(company) });
        if (!companyData) {
            return res.status(404).json({ message: "Not found Company with name " + company });
        }

        // Get the number of users who have opened the survey
        const surveyView = await Response.countDocuments({ company, answer: 'page-opened' });

        // Get the number of users who have seen the video intro
        const videoIntroSeen = await Response.countDocuments({ company, answer: 'video-played' });

        // Get the number of users who have watched the whole video
        const videoWatched = await Response.countDocuments({ company, answer: 'video-ended' });

        // Get the number of users who have answered yes to the question
        const yes = await Response.countDocuments({ company, answer: 'option1' });

        // Get the number of users who have answered no to the question
        const no = await Response.countDocuments({ company, answer: 'option2' });

        // Get the number of users who have have seen video yes
        const videoYesSeen = await Response.countDocuments({ company, answer: 'video-yes-started' });

        // Get the number of users who have have watched video yes
        const videoYesWatched = await Response.countDocuments({ company, answer: 'video-yes-ended' });

        // Get the number of users who have have seen video no
        const videoNoSeen = await Response.countDocuments({ company, answer: 'video-no-started' });

        // Get the number of users who have have watched video no
        const videoNoWatched = await Response.countDocuments({ company, answer: 'video-no-ended' });

        return res.status(200).json({ surveyView, videoIntroSeen, videoWatched, yes, no, videoYesSeen, videoYesWatched, videoNoSeen, videoNoWatched });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

exports.checkUserResponsed = async (req, res) => {
    try {
        // Get id, company, campaign from data
        const id = req.query.id;
        const campaign = req.query.campaign;
        let response;
        // Check if the TargetUser exists
        if (id !== 'undefined') {
            const targetUserData = await TargetUser.findOne({ _id: mongoose.Types.ObjectId(id) });
            if (!targetUserData) {
                return res.status(404).json({ message: "Not found user with id " + id });
            }
            // Check if the TargetUser has already responded
            response = await Response.findOne({ targetUser: id, campaign });
        }
        
        if (response !== null) {
            return res.status(200).json({ responsed: true });
        } else {
            return res.status(200).json({ responsed: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}