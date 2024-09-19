const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./route/authRoute");
const userRoutes = require("./route/userRoute");
const animeRoutes = require("./route/animeRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/anime", animeRoutes);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  })
);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
