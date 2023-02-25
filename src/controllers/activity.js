import {
  createActivityNote,
  getActivityData,
  createActivityTask,
  updateActivityTask,
  getObjectiveData,
  addActivityDates
} from "../database/databaseOperations";

export const getActivity = async (_req, res, next) => {
  return res.status(200).send("Activity GET");
};

export const getActivityId = async (req, res, next) => {
  const activity = await getActivityData(req.params.project, req.params.id);

  let objectives;
  req.params.id === "0"
    ? (objectives = [
        await getObjectiveData(req.params.project, "o"),
        await getObjectiveData(req.params.project, "v")
      ])
    : req.params.id === "1"
    ? (objectives = [
        await getObjectiveData(req.params.project, "s"),
        await getObjectiveData(req.params.project, "n")
      ])
    : (objectives = [
        await getObjectiveData(req.params.project, "s"),
        await getObjectiveData(req.params.project, "o")
      ]);

  return res.status(200).send({
    activity: activity[0],
    objectives: [objectives[0][0], objectives[1][0]]
  });
};

export const postNote = async (req, res, next) => {
  const owner = req.params.owner;
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;

  const updatedActivity = await createActivityNote(owner, id, title, body);
  return res.status(200).send(updatedActivity);
};

export const postTask = async (req, res, next) => {
  const owner = req.params.owner;
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;
  const deadline = req.body.deadline;

  const updatedActivity = await createActivityTask(
    owner,
    id,
    title,
    body,
    deadline
  );
  return res.status(200).send(updatedActivity);
};

export const updateTask = async (req, res, next) => {
  const owner = req.params.owner;
  const id = req.params.id;
  const task = req.params.task;

  const updatedActivity = await updateActivityTask(owner, id, task);
  return res.status(200).send(updatedActivity);
};

export const postPlan = async (req, res, next) => {
  const owner = req.params.owner;
  const id = req.body.id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const updatedActivity = await addActivityDates(owner, id, startDate, endDate);
  return res.status(200).send(updatedActivity);
};
