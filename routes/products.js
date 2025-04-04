import express from "express";
import Product from "../models/Product.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/", async (req, res) => {
  const { name, category, quantity, price } = req.body;
  const userId = req.user.id;

  const product = await Product.create({
    name,
    category,
    quantity,
    price,
    userId,
  });

  res.json(product);
});

router.get("/", async (req, res) => {
  const userId = req.user.id;
  const products = await Product.findAll({ where: { userId } });
  res.json(products);
});

router.get("/total-products", async (req, res) => {
  const userId = req.user.id;

  try {
    const totalProducts = await Product.count({ where: { userId } }); // Count user-specific products
    res.json({ totalProducts });
  } catch (error) {
    console.error("Error fetching total products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.user.id;
  const product = await Product.findOne({
    where: { id: req.params.id, userId },
  });

  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found or unauthorized" });
  }

  await product.update(req.body);
  res.json({ message: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const product = await Product.findOne({
    where: { id: req.params.id, userId },
  });

  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found or unauthorized" });
  }

  await product.destroy();
  res.json({ message: "Product deleted" });
});

export default router;
