const Complaint = require("../models/Complaint");

const getAllComplaints = (req, res, next) => {
  const userId = req.user.id; // Assuming you have the authenticated user's ID available in req.user.id
  const userRole = req.user.role; // Assuming you have the user's role available in req.user.role

  let query = {};

  if (userRole !== 'admin') {
    // Regular user can only retrieve their own complaints
    query = { owner: userId };
  }

  Complaint.find(query)
    .then((complaints) => {
      res.status(200).json({
        success: true,
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error retrieving complaints",
        error,
      });
    });
};


const createComplaint = (req, res, next) => {
  let complaint = {
    ...req.body,
    owner: req.user.id,
  };

  if (req.file) {
    complaint.image = "/complaint_images/" + req.file.filename;
  }

  Complaint.create(complaint)
    .then((complaint) => {
      res.status(201).json({
        message: "Complaint created successfully",
        complaint,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error creating complaint",
        error: error.message,
      });
    });
};


const deleteAllComplaints = (req, res, next) => {
  Complaint.deleteMany()
    .then((status) => {
      res
        .status(200)
        .json({ message: "All Complaints deleted successfully", status });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting all complaints", error });
    });
};

const getComplaintById = (req, res, next) => {
  Complaint.findById(req.params.complaint_id)
    // .populate("category")
    .then((complaint) => {
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
      res.json({
        success: true,
        message: "Complaint retrieved successfully",
        data: complaint,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving complaint", error });
    });
};

const updateComplaintById = (req, res, next) => {

  Complaint.findById(req.params.complaint_id)
    .then((complaint) => {
      if (!complaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }

      complaint.dat = req.body.dat || complaint.dat;
      complaint.location = req.body.location || complaint.location;
      complaint.description = req.body.description || complaint.description;
      complaint.offendername = req.body.offendername || complaint.offendername;
      complaint.offenderdet = req.body.offenderdet || complaint.offenderdet;
      if (req.file) {
        complaint.image = "/complaint_images/" + req.file.filename;
      }

      complaint
        .save()
        .then((updatedComplaint) => {
          const data = {
            id: updatedComplaint._id,
            dat: updatedComplaint.dat,
            location: updatedComplaint.location,
            description: updatedComplaint.description,
            offendername: updatedComplaint.offendername,
            offenderdet: updatedComplaint.offenderdet,
            calories: updatedComplaint.calories,
            image: updatedComplaint.image,
          };
          return res.json({
            success: true,
            message: "Complaint updated successfully",
            data,
          });
        })
        .catch((err) => {
          return res.status(400).json({ error: "Error updating complaint" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
};

const deleteComplaintById = (req, res, next) => {
  Complaint.findByIdAndDelete(req.params.complaint_id, req.body)
    .then((complaint) => {
      if (complaint) {
        res.json({ message: "Complaint item deleted successfully" });
      } else {
        res.status(404).json({ message: "Complaint item not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting complaint item", error });
    });
};

module.exports = {
  getAllComplaints,
  createComplaint,
  deleteAllComplaints,
  getComplaintById,
  updateComplaintById,
  deleteComplaintById,
};
