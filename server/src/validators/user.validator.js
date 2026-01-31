import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
    message: "Validation failed"
  });
};

export const registerValidator = [
  body("fullname")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 6 }).withMessage("Full name must be at least 6 characters"),
  
  body("email")
    .trim()
    .toLowerCase()
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const loginValidator = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail().withMessage("Invalid email format"),
  
  body("password")
    .notEmpty().withMessage("Password is required"),
];
