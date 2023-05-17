const Complaint = require("../models/Complaint");

const getAllProgress = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      res.json(complaint.progress);
    })
    .catch(next);
};

const createProgress = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      let progress = {
        status: req.body.status,
        comment: req.body.comment,
        officer: req.user.id,
      };
      complaint.progress.push(progress);
      complaint
        .save()
        .then((complaint) => res.status(201).json(complaint.progress))
        .catch(next);
    })
    .catch(next);
};

const deleteAllProgress = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      complaint.progress = [];
      complaint.save().then((complaint) => res.json(complaint));
    })
    .catch(next);
};

const getProgressById = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      let progress = complaint.progress.find(
        (progress) => progress.id === req.params.progress_id
      );
      if (progress) res.json(progress);
      else res.json({ msg: "Respective progress not found" });
    })
    .catch(next);
};

const updateProgressById = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      let progress = complaint.progress.id(req.params.progress_id);
      if (progress == null) {
        res.status(404);
        return next(new Error("Not found"));
      }
      if (progress.officer != req.user.id) {
        res.status(403);
        return next(new Error("Not authorized"));
      }
      progress.status = req.body.status;
      progress.comment = req.body.comment;
      complaint
        .save()
        .then((complaint) => res.json(complaint.progress))
        .catch(next);
    })
    .catch(next);
};

const deleteProgressById = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      let progress = complaint.progress.id(req.params.progress_id);
      if (progress == null) {
        res.status(404);
        return next(new Error("Not found"));
      }
      if (progress.officer != req.user.id) {
        res.status(403);
        return next(new Error("Not authorized"));
      }
      complaint.progress = complaint.progress.filter(
        (progress) => progress.id !== req.params.progress_id
      );
      complaint
        .save()
        .then((complaint) => res.json(complaint.progress))
        .catch(next);
    })
    .catch(next);
};
module.exports = {
  getAllProgress,
  createProgress,
  deleteAllProgress,
  getProgressById,
  updateProgressById,
  deleteProgressById,
};
