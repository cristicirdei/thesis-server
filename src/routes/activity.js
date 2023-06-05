import { Router } from "express";

import {
  getActivitiesDates,
  getActivity,
  getActivityId,
  postNote,
  postPlan,
  postTask,
  updateTask
} from "../controllers/activity";
import verifyUser from "../middleware/auth";

const activityRouter = new Router();

activityRouter.use(verifyUser);
activityRouter.get("/", getActivity);
activityRouter.get("/dates/:project", getActivitiesDates);
activityRouter.get("/:project/:id", getActivityId);
activityRouter.post("/plan/:owner", postPlan);
activityRouter.post("/note/:owner/:id", postNote);
activityRouter.post("/task/:owner/:id", postTask);
activityRouter.post("/task/:owner/:id/:task", updateTask);

export default activityRouter;
