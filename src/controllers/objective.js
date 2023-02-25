import { updateObjectiveData } from "../database/databaseOperations";

export const getObjective = async (req, res, next) => {
  return res
    .status(200)
    .send(
      "Objective with ID: " + req.params.id + " owned by: " + req.params.owner
    );
};

export const postObjectiveUpdates = async (req, res, next) => {
  const project = req.params.project;
  const id = req.params.id;
  const updatedObjective = await updateObjectiveData(project, id.charAt(0), id);

  return res.status(200).send(updatedObjective);
};
