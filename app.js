const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const config = require("./config");
const authRoutes = require("./route/authRoute");
const userRoutes = require("./route/userRoute");

const app = express();

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(
  cors({
    origin: "https://herlangga.my.id",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
