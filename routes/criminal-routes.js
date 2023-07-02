const express = require("express");
const router = express.Router();
const criminalController = require("../controllers/criminal-controller");
const upload = require("../middleware/upload");
const {
    verifyUser,
    verifyPolice,
    verifyAdmin,
} = require("../middleware/auth");

router
    .route("/")
    .get(verifyUser, criminalController.getAllCriminals)
    .post(verifyPolice, upload.single("criminalImage"), criminalController.createCriminal)
    .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .delete(verifyAdmin, criminalController.deleteAllCriminals);

router
    .route("/:criminal_id")
    .get(criminalController.getCriminalById)
    .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .put(verifyAdmin, upload.single("criminalImage"), criminalController.updateCriminalById)
    .delete(verifyAdmin, criminalController.deleteCriminalById);

module.exports = router;
