const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaint-controller");
const progressController = require("../controllers/complaint-progress-controller");
const upload = require("../middleware/upload");
const {
  verifyUser,
  verifyManager,
  verifyAdmin,
} = require("../middleware/auth");

router
  .route("/")
  .get(verifyUser, complaintController.getAllComplaints)
  .post(verifyAdmin, upload.single("complaintImage"), complaintController.createComplaint)
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(verifyAdmin, verifyManager, complaintController.deleteAllComplaints);


router
  .route("/:complaint_id")
  .get(complaintController.getComplaintById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(verifyUser, upload.single("complaintImage"), complaintController.updateComplaintById)
  .delete(verifyAdmin, complaintController.deleteComplaintById);

router
  .route("/:complaint_id/progress")
  .get(progressController.getAllProgress)
  .post(progressController.createProgress)
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(verifyAdmin, progressController.deleteAllProgress);

router
  .route("/:complaint_id/progress/:progress_id")
  .get(progressController.getProgressById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(progressController.updateProgressById)
  .delete(progressController.deleteProgressById);

module.exports = router;
