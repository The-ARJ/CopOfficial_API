const CrimeReport = require("../models/crimeReport");

const getAllCrimeReports = (req, res, next) => {
    const userId = req.user.id; // Assuming you have the authenticated user's ID available in req.user.id
    const userRole = req.user.role; // Assuming you have the user's role available in req.user.role

    let query = {};

    if (userRole !== 'admin') {
        // Regular user can only retrieve their own crime reports
        query = { owner: userId };
    }

    CrimeReport.find(query)
        .then((crimeReports) => {
            res.status(200).json({
                success: true,
                message: "Crime reports retrieved successfully",
                data: crimeReports,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Error retrieving crime reports",
                error,
            });
        });
};

const createCrimeReport = (req, res, next) => {
    let crimeReport = {
        ...req.body,
        owner: req.user.id,
    };

    if (req.file) {
        crimeReport.image = "/crime_report_images/" + req.file.filename;
    }

    CrimeReport.create(crimeReport)
        .then((createdCrimeReport) => {
            res.status(201).json({
                message: "Crime report created successfully",
                data: createdCrimeReport,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error creating crime report",
                error: error.message,
            });
        });
};

const deleteAllCrimeReports = (req, res, next) => {
    CrimeReport.deleteMany()
        .then(() => {
            res.status(200).json({
                message: "All crime reports deleted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting all crime reports",
                error,
            });
        });
};

const getCrimeReportById = (req, res, next) => {
    CrimeReport.findById(req.params.crimeReport_id)
        .then((crimeReport) => {
            if (!crimeReport) {
                return res.status(404).json({ message: "Crime report not found" });
            }
            res.json({
                success: true,
                message: "Crime report retrieved successfully",
                data: crimeReport,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving crime report", error });
        });
};

const updateCrimeReportById = (req, res, next) => {
    CrimeReport.findByIdAndUpdate(
        req.params.crimeReport_id,
        { $set: req.body },
        { new: true }
    )
        .then((updatedCrimeReport) => {
            if (!updatedCrimeReport) {
                return res.status(404).json({ message: "Crime report not found" });
            }
            res.json({
                success: true,
                message: "Crime report updated successfully",
                data: updatedCrimeReport,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating crime report", error });
        });
};

const deleteCrimeReportById = (req, res, next) => {
    CrimeReport.findByIdAndDelete(req.params.crimeReport_id)
        .then((crimeReport) => {
            if (crimeReport) {
                res.json({ message: "Crime report deleted successfully" });
            } else {
                res.status(404).json({ message: "Crime report not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting crime report",
                error,
            });
        });
};

module.exports = {
    getAllCrimeReports,
    createCrimeReport,
    deleteAllCrimeReports,
    getCrimeReportById,
    updateCrimeReportById,
    deleteCrimeReportById,
};
