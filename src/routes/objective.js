import { Router } from "express";

import { getObjective, postObjectiveUpdates } from "../controllers/objective";

const objectiveRouter = new Router();

objectiveRouter.get("/:id/:owner", getObjective);
objectiveRouter.post("/:project/:id", postObjectiveUpdates);

export default objectiveRouter;
