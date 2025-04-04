import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});

app.use(
  "/api/auth",
  (req, res, next) => {
    console.log(`Request to ${req.url} with method ${req.method}`);
    next();
  },
  authRoutes
);

app.use(
  "/api/products",
  (req, res, next) => {
    console.log(`Request to ${req.url} with method ${req.method}`);
    next();
  },
  productRoutes
);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
