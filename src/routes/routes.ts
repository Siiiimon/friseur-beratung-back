import { Router } from "express";
import { getHealth } from "../controller/healthController";
import { newQuestionnaire } from "../controller/questionnaireController";

const router = Router();
const questionnaireRouter = Router();

router.get("/health", getHealth);
router.use("/questionnaire", questionnaireRouter);

questionnaireRouter.get("/new", newQuestionnaire);

export default router;
