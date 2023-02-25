import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import ProblemError from "../util/ProblemError";
import { MESSAGE_TYPES } from "../util/constants";
import { ERROR_CODES, INCORRECT_ID } from "../util/errors";
import {
  createCompetency,
  createActivity,
  checkpoints_stakeholders,
  checkpoints_opportunity,
  checkpoints_stakeholder_network,
  checkpoints_product_vision
} from "./models";

const UserModule = require("../models/user").default;
const User = UserModule.User;

const ProjectModule = require("../models/project").default;
const Project = ProjectModule.Project;

const CompetencyModule = require("../models/competency").default;
const Competency = CompetencyModule.Competency;

const ActivityModule = require("../models/activity").default;
const Activity = ActivityModule.Activity;

const DocumentModule = require("../models/document").default;
const Document = DocumentModule.Document;

const TaskModule = require("../models/task").default;
const Task = TaskModule.Task;

const ObjectiveModule = require("../models/objective").default;
const Objective = ObjectiveModule.Objective;

// check ObjectId validity
export function ValidId(param) {
  return mongoose.Types.ObjectId.isValid(param);
}

// check if user already exists
export async function userExists(email) {
  return await User.findOne({ email });
}

// get ID of user with email
export async function userId(email) {
  return await User.findOne({ email }).select("_id");
}

export async function getProjectData(ownerId) {
  const objectId = new ObjectId(ownerId);
  return await Project.find({ "owner._id": objectId });
}

export async function createProject(project) {
  const id = new ObjectId(project.owner.id._id);

  const owner = new User({
    email: project.owner.email,
    _id: id
  });

  let team = [];
  project.team.map((member) =>
    team.push(
      new User({
        email: member.email,
        password: "mypass",
        role: member.role,
        name: member.name
      })
    )
  );

  // project
  const newProject = new Project({
    name: project.name,
    details: project.description,
    company: project.company,
    team: team,
    owner: owner
  });

  // competencies
  const stakeholder_representation = createCompetency(
    "Stakeholder Representation",
    "sr",
    0,
    owner,
    team
  );
  const analysis = createCompetency("Analysis", "an", 1, owner, team);
  const development = createCompetency("Development", "dv", 2, owner, team);
  const testing = createCompetency("Testing", "ts", 3, owner, team);

  stakeholder_representation.save();
  analysis.save();
  development.save();
  testing.save();

  // activities
  const evolve_product_vision = createActivity(
    "Evolve the Product Vision",
    0,
    owner
  );
  const build_stakeholder_network = createActivity(
    "Build Stakeholder Network",
    1,
    owner
  );
  const demonstrate_product = createActivity(
    "Demonstrate the Product",
    2,
    owner
  );
  const achieve_acceptance = createActivity("Achieve Acceptance", 3, owner);

  evolve_product_vision.save();
  build_stakeholder_network.save();
  demonstrate_product.save();
  achieve_acceptance.save();

  // objectives
  const stakeholders = new Objective({
    name: "Stakeholders",
    o_id: "s",
    owner: owner,
    checkpoints: checkpoints_stakeholders
  });
  const opportunity = new Objective({
    name: "Opportunity",
    o_id: "o",
    owner: owner,
    checkpoints: checkpoints_opportunity
  });
  const stakeholder_network = new Objective({
    name: "Stakeholder Network",
    o_id: "n",
    owner: owner,
    checkpoints: checkpoints_stakeholder_network
  });
  const product_vision = new Objective({
    name: "Product Vision",
    o_id: "v",
    owner: owner,
    checkpoints: checkpoints_product_vision
  });

  stakeholders.save();
  opportunity.save();
  stakeholder_network.save();
  product_vision.save();

  // save project
  newProject.save();
  return newProject;
}

export async function getCompetencyData(ownerId, competencyId) {
  const objectId = new ObjectId(ownerId);
  return await Competency.find({ "owner._id": objectId, a_id: competencyId });
}

export async function getActivityData(ownerId, activityId) {
  const objectId = new ObjectId(ownerId);
  return await Activity.find({ "owner._id": objectId, a_id: activityId });
}

export async function getObjectiveData(ownerId, objectiveId) {
  const objectId = new ObjectId(ownerId);
  return await Objective.find({ "owner._id": objectId, o_id: objectiveId });
}

export async function updateCompetencyData(
  ownerId,
  competencyId,
  personId,
  conditionId
) {
  return await Competency.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      a_id: competencyId
    },
    { $set: { "people.$[outer].checkpoints.$[inner].status": "complete" } },
    {
      arrayFilters: [
        { "outer.user._id": personId },
        { "inner.c_id": conditionId }
      ],
      new: true
    }
  );
}

export async function updateObjectiveData(ownerId, objectiveId, stepId) {
  return await Objective.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      o_id: objectiveId
    },
    { $set: { "checkpoints.$[inner].status": "complete" } },
    {
      arrayFilters: [{ "inner.c_id": stepId }],
      new: true
    }
  );
}

export async function updateActivityTask(ownerId, activityId, taskId) {
  return await Activity.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      a_id: activityId
    },
    { $set: { "tasks.$[outer].state": "complete" } },
    {
      arrayFilters: [{ "outer._id": taskId }],
      new: true
    }
  );
}

export async function createCompetencyNote(ownerId, competencyId, title, body) {
  const objectId = new ObjectId(ownerId);
  const owner = await User.findOne({ objectId });

  const newDocument = new Document({
    title: title,
    body: body,
    owner: owner
  });

  return await Competency.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      a_id: competencyId
    },
    { $push: { notes: [newDocument] } },
    { new: true }
  );
}

export async function createActivityNote(ownerId, competencyId, title, body) {
  const objectId = new ObjectId(ownerId);
  const owner = await User.findOne({ objectId });

  const newDocument = new Document({
    title: title,
    body: body,
    owner: owner
  });

  return await Activity.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      a_id: competencyId
    },
    { $push: { notes: [newDocument] } },
    { new: true }
  );
}

export async function addActivityDates(
  ownerId,
  activityId,
  startDate,
  endDate
) {
  return await Activity.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      a_id: activityId
    },
    { startDate: startDate, endDate: endDate },
    { new: true, upsert: true }
  );
}

export async function createActivityTask(
  ownerId,
  competencyId,
  title,
  body,
  deadline
) {
  const objectId = new ObjectId(ownerId);
  const owner = await User.findOne({ objectId });

  const newTask = new Task({
    title: title,
    body: body,
    owner: owner,
    deadline: deadline,
    state: "undefined"
  });

  return await Activity.findOneAndUpdate(
    {
      "owner._id": new ObjectId(ownerId),
      a_id: competencyId
    },
    { $push: { tasks: [newTask] } },
    { new: true }
  );
}
