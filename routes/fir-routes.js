const express = require("express");
const router = express.Router();
const firController = require("../controllers/fir-controller");
const upload = require("../middleware/upload");
const {
    verifyUser,
    verifyPolice,
    verifyAdmin,
} = require("../middleware/auth");

router
    .route("/")
    .get(verifyUser, firController.getAllFIRs)
    .post(verifyUser, upload.fields([{ name: "firImage", maxCount: 1 }, { name: "firVideo", maxCount: 1 }]), firController.createFIR)
    .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .delete(verifyAdmin, verifyPolice, firController.deleteAllFIRs);

router
    .route("/:fir_id")
    .get(firController.getFIRById)
    .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .put(verifyAdmin, upload.fields([{ name: "firImage", maxCount: 1 }, { name: "firVideo", maxCount: 1 }]), firController.updateFIRById)
    .delete(verifyAdmin, firController.deleteFIRById);

module.exports = router;
