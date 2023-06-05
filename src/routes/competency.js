import { Router } from "express";

import {
  getCompetency,
  getCompetencyId,
  postCompetencyUpdate,
  postNote
} from "../controllers/competency";
import verifyUser from "../middleware/auth";

const competencyRouter = new Router();

competencyRouter.use(verifyUser);
competencyRouter.get("/", getCompetency);
competencyRouter.post("/note/:owner/:id", postNote);
competencyRouter.get("/:project/:id", getCompetencyId);
competencyRouter.post("/:project/:id/:person", postCompetencyUpdate);

export default competencyRouter;
