import { Router } from "express";
import { getHealth } from "../controller/healthController";
import {
    newQuestionnaire,
    submitQuestionnaire,
} from "../controller/questionnaireController";

const router = Router();
const questionnaireRouter = Router();

router.get("/health", getHealth);
router.use("/questionnaire", questionnaireRouter);

questionnaireRouter.get("/new", newQuestionnaire);
questionnaireRouter.post("/submit", submitQuestionnaire);

export default router;
