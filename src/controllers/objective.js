import {
  updateObjectiveData,
  getObjectiveData
} from "../database/databaseOperations";

const getSum = (cond) => {
  let sum = 0;
  cond.forEach((c) => {
    if (c.status === "complete") {
      sum++;
    }
  });

  return sum;
};

export const getObjective = async (req, res, next) => {
  const objective = await getObjectiveData(req.params.project, req.params.id);

  const levels = [];
  const c = objective[0].checkpoints;

  let level;
  let check_states;

  if (req.params.id === "s") {
    check_states = [
      [c[0], c[1], c[2]],
      [c[3], c[4], c[5], c[6]],
      [c[7], c[8], c[8]],
      [c[10], c[11], c[12], c[13], c[14]],
      [c[15], c[16]],
      [c[17], c[18]]
    ];
  }

  if (req.params.id === "o") {
    check_states = [
      [c[0], c[1], c[2]],
      [c[3], c[4], c[5], c[6], c[7]],
      [c[8], c[9], c[10], c[11], c[12]],
      [c[13], c[14], c[15], c[16], c[17], c[18]],
      [c[19], c[20], c[21]],
      [c[22], c[23]]
    ];
  }

  if (req.params.id === "v") {
    check_states = [
      [c[0], c[1], c[2]],
      [c[3], c[4], c[5]],
      [c[6], c[7]],
      [c[8], c[8]]
    ];
  }

  if (req.params.id === "n") {
    check_states = [
      [c[0], c[1], c[2], c[3]],
      [c[4], c[5], c[6]],
      [c[7], c[8], c[8]]
    ];
  }

  check_states.forEach((state, index) => {
    getSum(state) === 0
      ? (level = "no status")
      : getSum(state) === state.length
      ? (level = "complete")
      : (level = "incomplete");

    levels.push({
      state: index,
      status: level
    });
  });

  return res.status(200).send({ objective: objective[0].o_id, levels: levels });
};

export const postObjectiveUpdates = async (req, res, next) => {
  const project = req.params.project;
  const id = req.params.id;
  const updatedObjective = await updateObjectiveData(project, id.charAt(0), id);

  return res.status(200).send(updatedObjective);
};
