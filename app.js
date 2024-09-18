const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const authRoutes = require("./route/authRoute");
const userRoutes = require("./route/userRoute");

const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL })
);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
