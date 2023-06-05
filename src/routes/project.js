import { Router } from "express";

import verifyUser from "../middleware/auth";

import { getProject, postProject } from "../controllers/project";

const projectRouter = new Router();

projectRouter.use(verifyUser);
projectRouter.get("/:id", getProject);
projectRouter.post("/", postProject);

export default projectRouter;
