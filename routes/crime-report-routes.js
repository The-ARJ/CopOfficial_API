const express = require("express");
const router = express.Router();
const crimeReportController = require("../controllers/crime-report-controller");
const upload = require("../middleware/upload");
const {
    verifyUser,
    verifyPolice,
    verifyAdmin,
} = require("../middleware/auth");

router
    .route("/")
    .get(verifyUser, crimeReportController.getAllCrimeReports)
    .post(verifyUser, upload.single("crimeReportImage"), crimeReportController.createCrimeReport)
    .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .delete(verifyPolice, verifyPolice, crimeReportController.deleteAllCrimeReports);

router
    .route("/:crimeReport_id")
    .get(crimeReportController.getCrimeReportById)
    .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .put(verifyAdmin, upload.single("crimeReportImage"), crimeReportController.updateCrimeReportById)
    .delete(verifyAdmin, crimeReportController.deleteCrimeReportById);

module.exports = router;
