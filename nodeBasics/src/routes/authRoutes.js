
import express from "express";
import { register, verify, login } from "../controllers/authController.js";
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);

// Protected route (only admin)
router.get("/admin-dashboard", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
