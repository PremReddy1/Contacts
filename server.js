const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const UserRoute = require("./routes/userRoutes");
const ContactRoute = require("./routes/contactRouter");

const db_Uri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose
  .connect(db_Uri)
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.error(err));

app.use("/", UserRoute);
app.use("/", ContactRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => console.log("Server Started on http://localhost:5000/"));
