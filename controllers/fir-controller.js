const FIR = require("../models/firSchema");

const getAllFIRs = (req, res, next) => {
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = {};

    if (userRole !== 'admin') {
        query = { owner: userId };
    }

    FIR.find(query)
        .then((firs) => {
            res.status(200).json({
                success: true,
                message: "FIRs retrieved successfully",
                data: firs,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Error retrieving FIRs",
                error,
            });
        });
};

const createFIR = (req, res, next) => {
    let fir = {
        ...req.body,
        owner: req.user.id,
    };
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
    if (req.files && req.files.firImage) {
        fir.image = "/fir-images/" + req.files.firImage[0].filename;
    }

    if (req.files && req.files.firVideo) {
        fir.video = "/fir-videos/" + req.files.firVideo[0].filename;
    }

    FIR.create(fir)
        .then((createdFIR) => {
            res.status(201).json({
                message: "FIR created successfully",
                data: createdFIR,
            });
        })
        .catch((error) => {
            // console.log(error)
            res.status(500).json({
                message: "Error creating FIR",
                error: error.message,
            });
        });
};



const deleteAllFIRs = (req, res, next) => {
    FIR.deleteMany()
        .then(() => {
            res.status(200).json({
                message: "All FIRs deleted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting all FIRs",
                error,
            });
        });
};

const getFIRById = (req, res, next) => {
    FIR.findById(req.params.fir_id)
        .then((fir) => {
            if (!fir) {
                return res.status(404).json({ message: "FIR not found" });
            }
            res.json({
                success: true,
                message: "FIR retrieved successfully",
                data: fir,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving FIR", error });
        });
};

const updateFIRById = (req, res, next) => {
    FIR.findByIdAndUpdate(
        req.params.fir_id,
        { $set: req.body },
        { new: true }
    )
        .then((updatedFIR) => {
            if (!updatedFIR) {
                return res.status(404).json({ message: "FIR not found" });
            }
            res.json({
                success: true,
                message: "FIR updated successfully",
                data: updatedFIR,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating FIR", error });
        });
};

const deleteFIRById = (req, res, next) => {
    FIR.findByIdAndDelete(req.params.fir_id)
        .then((fir) => {
            if (fir) {
                res.json({ message: "FIR deleted successfully" });
            } else {
                res.status(404).json({ message: "FIR not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting FIR",
                error,
            });
        });
};

module.exports = {
    getAllFIRs,
    createFIR,
    deleteAllFIRs,
    getFIRById,
    updateFIRById,
    deleteFIRById,
};
