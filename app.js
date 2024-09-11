const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const authRoutes = require("./route/authRoute");
const userRoutes = require("./route/userRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://herlangga.my.id", // Ganti dengan URL frontend Anda
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
