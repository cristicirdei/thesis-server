import {
  getCompetencyData,
  updateCompetencyData,
  createCompetencyNote
} from "../database/databaseOperations";

export const getCompetency = async (_req, res, next) => {
  return res.status(200).send("Competency GET");
};

export const getCompetencyId = async (req, res, next) => {
  const competency = await getCompetencyData(req.params.project, req.params.id);

  const levels = [];
  competency[0].people.map((person) => {
    let level;

    person.checkpoints[19].status === "complete" &&
    person.checkpoints[20].status === "complete" &&
    person.checkpoints[21].status === "complete" &&
    person.checkpoints[22].status === "complete" &&
    person.checkpoints[23].status === "complete"
      ? (level = { level: 5, name: "Innovates" })
      : person.checkpoints[15].status === "complete" &&
        person.checkpoints[16].status === "complete" &&
        person.checkpoints[17].status === "complete" &&
        person.checkpoints[18].status === "complete"
      ? (level = { level: 4, name: "Adapts" })
      : person.checkpoints[9].status === "complete" &&
        person.checkpoints[10].status === "complete" &&
        person.checkpoints[11].status === "complete" &&
        person.checkpoints[12].status === "complete" &&
        person.checkpoints[13].status === "complete" &&
        person.checkpoints[14].status === "complete"
      ? (level = { level: 3, name: "Masters" })
      : person.checkpoints[4].status === "complete" &&
        person.checkpoints[5].status === "complete" &&
        person.checkpoints[6].status === "complete" &&
        person.checkpoints[7].status === "complete" &&
        person.checkpoints[8].status === "complete"
      ? (level = { level: 2, name: "Applies" })
      : person.checkpoints[0].status === "complete" &&
        person.checkpoints[1].status === "complete" &&
        person.checkpoints[2].status === "complete" &&
        person.checkpoints[3].status === "complete"
      ? (level = { level: 1, name: "Assists" })
      : (level = { level: 0, name: "Undefined" });

    levels.push({
      person: person.user,
      level: level
    });
  });

  return res.status(200).send({ competency: competency[0], levels: levels });
};

export const postCompetencyUpdate = async (req, res, next) => {
  const project = req.params.project;
  const id = req.params.id;
  const person = req.params.person;
  const condition = req.body.condition;
  const updatedCompetency = await updateCompetencyData(
    project,
    id,
    person,
    condition
  );

  const levels = [];
  updatedCompetency.people.map((person) => {
    let level;

    person.checkpoints[19].status === "complete" &&
    person.checkpoints[20].status === "complete" &&
    person.checkpoints[21].status === "complete" &&
    person.checkpoints[22].status === "complete" &&
    person.checkpoints[23].status === "complete"
      ? (level = { level: 5, name: "Innovates" })
      : person.checkpoints[15].status === "complete" &&
        person.checkpoints[16].status === "complete" &&
        person.checkpoints[17].status === "complete" &&
        person.checkpoints[18].status === "complete"
      ? (level = { level: 4, name: "Adapts" })
      : person.checkpoints[9].status === "complete" &&
        person.checkpoints[10].status === "complete" &&
        person.checkpoints[11].status === "complete" &&
        person.checkpoints[12].status === "complete" &&
        person.checkpoints[13].status === "complete" &&
        person.checkpoints[14].status === "complete"
      ? (level = { level: 3, name: "Masters" })
      : person.checkpoints[4].status === "complete" &&
        person.checkpoints[5].status === "complete" &&
        person.checkpoints[6].status === "complete" &&
        person.checkpoints[7].status === "complete" &&
        person.checkpoints[8].status === "complete"
      ? (level = { level: 2, name: "Applies" })
      : person.checkpoints[0].status === "complete" &&
        person.checkpoints[1].status === "complete" &&
        person.checkpoints[2].status === "complete" &&
        person.checkpoints[3].status === "complete"
      ? (level = { level: 1, name: "Assists" })
      : (level = { level: 0, name: "Undefined" });

    levels.push({
      person: person.user,
      level: level
    });
  });

  return res
    .status(200)
    .send({ competency: updatedCompetency, levels: levels });
};

export const postNote = async (req, res, next) => {
  const owner = req.params.owner;
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;

  const updatedCompetency = await createCompetencyNote(owner, id, title, body);
  return res.status(200).send(updatedCompetency);
};
