const db = require('../models');
const Company = db.company;
const xlsx = require('xlsx');
const { v4: uuidv4 } = require("uuid");
const TargetUser = require("../models/target.user.model");

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
        const companyName = req.params.companyName;
        const company = Company.findOne({ name: companyName });
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