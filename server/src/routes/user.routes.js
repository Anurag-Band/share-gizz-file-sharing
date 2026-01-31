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

router.get("/user", getUsers);
router.get("/user/:userId", getUserById);
router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.get("/logout", logoutUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
