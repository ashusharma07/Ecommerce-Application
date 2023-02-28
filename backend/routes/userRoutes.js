import express from "express";
import { authUser, getUserProfile } from "../controller/userController.js";
import { protect } from "../middleWare/authMiddleWare.js";
const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
