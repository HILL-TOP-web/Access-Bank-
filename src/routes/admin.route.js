import express from "express";
import {
  getAllUsers,
  getSystemStats
} from "../controllers/admin.controller.js";

// Named import for authMiddleware (because it is exported as a named export)
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Default import for adminMiddleware (assuming it’s exported as default)
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

// Routes protected with both middlewares
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/stats", authMiddleware, adminMiddleware, getSystemStats);

export default router;
