import { Router } from "express";
import upload from "../middlewares/upload.middlewares.js";
import authenticate from "../middlewares/auth.middlewares.js";
import { uploadFileValidator } from "../validators/file.validator.js";
import { validate } from "../validators/user.validator.js"; // Reuse the general validate middleware
import {
  deleteFile,
  downloadFile,
  generateQR,
  generateShareShortenLink,
  getDownloadCount,
  getFileDetails,
  getUserFiles,
  resolveShareLink,
  searchFiles,
  sendLinkEmail,
  showUserFiles,
  updateFileExpiry,
  updateFilePassword,
  updateFileStatus,
  uploadFiles,
  verifyFilePassword,
} from "../controllers/file.controller.js";

const router = Router();

router.post("/upload", authenticate, upload.single("file"), uploadFileValidator, validate, uploadFiles);
router.get("/download/:fileId", downloadFile);
router.delete("/delete/:fileId", authenticate, deleteFile);
router.put("/update/:fileId", authenticate, updateFileStatus);
router.get("/getFileDetails/:fileId", getFileDetails);
router.post("/generateShareShortenLink", authenticate, generateShareShortenLink);
router.post("/sendLinkEmail", authenticate, sendLinkEmail);

router.post("/updateFileExpiry", authenticate, updateFileExpiry);
router.post("/updateFilePassword", authenticate, updateFilePassword);
router.get("/searchFiles", authenticate, searchFiles);
router.get("/showUserFiles", authenticate, showUserFiles);

router.get("/generateQR/:fileId", generateQR);
router.get("getDownloadCount/:fileId", getDownloadCount);
router.post("/resolveShareLink", resolveShareLink);
router.post("/verifyFilePassword", verifyFilePassword);
router.get("/userFiles/:userId", authenticate, getUserFiles);

router.get("/resolveShareLink/:shortUrl", resolveShareLink);
router.post("/verifyFilePassword", verifyFilePassword);

router.get("/getUserFiles/:userId", getUserFiles);

export default router;
