import { Router } from "express";

import {
  getCompetency,
  getCompetencyId,
  postCompetencyUpdate,
  postNote
} from "../controllers/competency";

const competencyRouter = new Router();

competencyRouter.get("/", getCompetency);
competencyRouter.post("/note/:owner/:id", postNote);
competencyRouter.get("/:project/:id", getCompetencyId);
competencyRouter.post("/:project/:id/:person", postCompetencyUpdate);

export default competencyRouter;
