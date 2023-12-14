const db = require('../models');
const Company = db.company;
const csvtojson = require("csvtojson");
const { v4: uuidv4 } = require("uuid");
const TargetUser = require("../models/target.user.model");
var path = require('path');
const __basedir = path.resolve();
const fs = require('fs');


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

,exports.uploadExcelFile = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let pathToUpload = path.join(__basedir, '/public/', req.file.filename);
        const csvData = await csvtojson({ noheader: true, headers: ["name", "phoneNumber", "location"] }).fromFile(pathToUpload);

        let targetUsers = csvData.map((csvRow) => ({
            // 10 character max uuid
            id: uuidv4().substring(0, 10),
            name: csvRow.name,
            phoneNumber: csvRow.phoneNumber,
            location: csvRow.location,
            company: req.body.companyId
        }));

        TargetUser.insertMany(targetUsers, (err, docs) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
        });

        fs.unlinkSync(pathToUpload);
    } catch (error) {
        console.error('Error uploading excel file:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}