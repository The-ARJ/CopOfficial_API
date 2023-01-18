// Import necessary modules and files
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("./logger");
const auth = require("./middleware/auth");
const port = process.env.PORT || 3005;
const cors = require("cors");
const userRouter = require("./routes/users-routes");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Initialize Express app
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home page route
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// User router middleware
app.use("/users", userRouter);

// Authentication middleware
app.use(auth.verifyUser);

// CORS middleware
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (res.statusCode == 200) res.status(500);
  res.json({ msg: err.message });
  next;
});

// Start the server after connecting to MongoDB
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
});
