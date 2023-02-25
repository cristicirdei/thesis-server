import { createProject, getProjectData } from "../database/databaseOperations";

export const getProject = async (req, res, next) => {
  try {
    const project = await getProjectData(req.params.id);
    return res.status(200).send(project);
  } catch (error) {
    next(error);
  }
};

export const postProject = async (req, res, next) => {
  try {
    const newProject = await createProject(req.body);
    return res.status(200).send(newProject);
  } catch (error) {
    next(error);
  }
};
