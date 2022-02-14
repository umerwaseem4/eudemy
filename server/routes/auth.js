import express from "express";
import { login, logout, register, currentUser } from "../controllers/auth.js";
import { requireSignIn } from "../middlewares/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);

export default router;
