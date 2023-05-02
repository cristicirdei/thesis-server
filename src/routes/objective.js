import { Router } from "express";

import { getObjective, postObjectiveUpdates } from "../controllers/objective";

const objectiveRouter = new Router();

objectiveRouter.get("/:project/:id", getObjective);
objectiveRouter.post("/:project/:id", postObjectiveUpdates);

export default objectiveRouter;
