import express, { Router } from "express";

const router = Router();
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
} from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middlewares.js";
import {
  registerValidator,
  loginValidator,
  validate,
} from "../validators/user.validator.js";

router.get("/user", authenticate, getUsers);
router.get("/user/:userId", authenticate, getUserById);
router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.get("/logout", authenticate, logoutUser);
router.put("/user/:userId", authenticate, updateUser);
router.delete("/user/:userId", authenticate, deleteUser);

export default router;
