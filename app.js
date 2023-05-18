require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/users-routes");
const profilesRouter = require("./routes/profile-routes");
const complaintsRouter = require("./routes/complaints-routes");
const contactRouter = require("./routes/contact-routes");
const bodyParser = require("body-parser");


const auth = require("./middleware/auth");

const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_DB_URI
        : process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        mongoose.set("strictQuery", false);
    })
    .catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static("uploads"));

app.use(express.urlencoded({ extended: false }));
// To accept json data
app.use(express.json());
// To serve static files

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use("/users", userRouter);
app.use("/contacts", contactRouter);
app.use(auth.verifyUser);
app.use("/profiles", auth.verifyUser, profilesRouter);
app.use("/complaints", complaintsRouter);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (res.statusCode == 200) res.status(500);
    res.json({ msg: err.message });
    next;
});
module.exports = app;
