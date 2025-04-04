import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

export default router;
