import { body } from "express-validator";

export const uploadFileValidator = [
  body("userId")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID format"),
  
  body("isPassword")
    .optional()
    .isBoolean().withMessage("isPassword must be a boolean"),
  
  body("password")
    .if(body("isPassword").equals("true"))
    .notEmpty().withMessage("Password is required when file is password protected")
    .isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    
  body("hasExpiry")
    .optional()
    .isBoolean().withMessage("hasExpiry must be a boolean"),

  body("expiresAt")
    .optional()
    .isNumeric().withMessage("expiresAt must be a number (hours)"),
];
