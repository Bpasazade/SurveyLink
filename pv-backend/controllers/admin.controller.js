const db = require('../models');
const TargetUser = require('../models/target.user.model');
const Company = db.company;
const Campaign = db.campaign;

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
        const { id } = req.params;
        const { companyName, companyAddress } = req.body;
        const company = await Company.findByIdAndUpdate(id, { companyName, companyAddress }, { new: true });
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