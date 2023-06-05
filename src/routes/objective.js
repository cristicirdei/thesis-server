import { Router } from "express";

import { getObjective, postObjectiveUpdates } from "../controllers/objective";
import verifyUser from "../middleware/auth";

const objectiveRouter = new Router();

objectiveRouter.use(verifyUser);
objectiveRouter.get("/:project/:id", getObjective);
objectiveRouter.post("/:project/:id", postObjectiveUpdates);

export default objectiveRouter;
