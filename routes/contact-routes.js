const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact-controller");
const {
    verifyManager,
    verifyAdmin,
} = require("../middleware/auth");

router
    .route("/")
    .get(verifyAdmin, contactController.getAllContacts)
    .post(contactController.createContact)
    .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
    .delete(verifyAdmin, verifyManager, contactController.deleteAllContacts);


module.exports = router;
