const Criminal = require("../models/criminalSchema");

const getAllCriminals = (req, res, next) => {
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = {};

    if (userRole !== 'admin') {
        query = { owner: userId };
    }

    Criminal.find(query)
        .then((criminals) => {
            res.status(200).json({
                success: true,
                message: "Criminals retrieved successfully",
                data: criminals,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Error retrieving criminals",
                error,
            });
        });
};

const createCriminal = (req, res, next) => {
    let criminal = {
        ...req.body,
        owner: req.user.id,
    };

    if (req.file) {
        criminal.image = "/criminal-images/" + req.file.filename;
    }

    Criminal.create(criminal)
        .then((createdCriminal) => {
            res.status(201).json({
                message: "Criminal created successfully",
                data: createdCriminal,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error creating criminal",
                error: error.message,
            });
        });
};

const deleteAllCriminals = (req, res, next) => {
    Criminal.deleteMany()
        .then(() => {
            res.status(200).json({ message: "All criminals deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error deleting all criminals", error });
        });
};

const getCriminalById = (req, res, next) => {
    Criminal.findById(req.params.criminal_id)
        .then((criminal) => {
            if (!criminal) {
                return res.status(404).json({ message: "Criminal not found" });
            }
            res.json({
                success: true,
                message: "Criminal retrieved successfully",
                data: criminal,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving criminal", error });
        });
};

const updateCriminalById = (req, res, next) => {
    Criminal.findById(req.params.criminal_id)
        .then((criminal) => {
            if (!criminal) {
                return res.status(404).json({ error: "Criminal not found" });
            }
            criminal.firstName = req.body.firstName || criminal.firstName;
            criminal.lastName = req.body.lastName || criminal.lastName;
            criminal.dateOfBirth = req.body.dateOfBirth || criminal.dateOfBirth;
            criminal.gender = req.body.gender || criminal.gender;
            criminal.age = req.body.age || criminal.age;
            criminal.status = req.body.status || criminal.status;
            criminal.address = req.body.address || criminal.address;
            criminal.phoneNumber = req.body.phoneNumber || criminal.phoneNumber;
            criminal.aliases = req.body.aliases || criminal.aliases;
            criminal.description = req.body.description || criminal.description;
            criminal.crime = req.body.crime || criminal.crime;

            if (req.file) {
                criminal.image = "/criminal_images/" + req.file.filename;
            }

            criminal
                .save()
                .then((updatedCriminal) => {
                    res.json({
                        success: true,
                        message: "Criminal updated successfully",
                        data: updatedCriminal,
                    });
                })
                .catch((err) => {
                    return res.status(400).json({ error: "Error updating criminal" });
                });
        })
        .catch((err) => {
            return res.status(500).json({ error: "Server Error" });
        });
};

const deleteCriminalById = (req, res, next) => {
    Criminal.findByIdAndDelete(req.params.criminal_id)
        .then((criminal) => {
            if (criminal) {
                res.json({ message: "Criminal deleted successfully" });
            } else {
                res.status(404).json({ message: "Criminal not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Error deleting criminal", error });
        });
};

module.exports = {
    getAllCriminals,
    createCriminal,
    deleteAllCriminals,
    getCriminalById,
    updateCriminalById,
    deleteCriminalById,
};
