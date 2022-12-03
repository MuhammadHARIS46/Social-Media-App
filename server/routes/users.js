import express from "express";
import { signin } from "../controllers/user.js";
const router = express.Router();

router.post("/signin",signin);

// router.post("/sigup",signup)

export default router;
