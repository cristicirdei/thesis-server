import { Router } from "express";

import {
  getActivity,
  getActivityId,
  postNote,
  postPlan,
  postTask,
  updateTask
} from "../controllers/activity";

const activityRouter = new Router();

activityRouter.get("/", getActivity);
activityRouter.get("/:project/:id", getActivityId);
activityRouter.post("/plan/:owner", postPlan);
activityRouter.post("/note/:owner/:id", postNote);
activityRouter.post("/task/:owner/:id", postTask);
activityRouter.post("/task/:owner/:id/:task", updateTask);

export default activityRouter;
