import express from "express";
import { signupController, loginController , logoutController, verifyController } from "../controllers/AuthController.js";
import { verifyAccessToken } from "../middlewares/VerifyAccessToken.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout",verifyAccessToken ,logoutController);
router.get("/verify", verifyAccessToken, verifyController);


export default router;
