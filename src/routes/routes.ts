import { Router } from "express";
import { getHealth } from "../controller/healthController";

const router = Router();

router.get("/health", getHealth);

export default router;
