const CompetencyModule = require("../models/competency").default;
const Competency = CompetencyModule.Competency;

const ActivityModule = require("../models/activity").default;
const Activity = ActivityModule.Activity;

const checkpoints = (code) => {
  return [
    { c_id: code + "_1_1", status: "undefined" },
    { c_id: code + "_1_2", status: "undefined" },
    { c_id: code + "_1_3", status: "undefined" },
    { c_id: code + "_1_4", status: "undefined" },
    { c_id: code + "_2_1", status: "undefined" },
    { c_id: code + "_2_2", status: "undefined" },
    { c_id: code + "_2_3", status: "undefined" },
    { c_id: code + "_2_4", status: "undefined" },
    { c_id: code + "_2_5", status: "undefined" },
    { c_id: code + "_3_1", status: "undefined" },
    { c_id: code + "_3_2", status: "undefined" },
    { c_id: code + "_3_3", status: "undefined" },
    { c_id: code + "_3_4", status: "undefined" },
    { c_id: code + "_3_5", status: "undefined" },
    { c_id: code + "_3_6", status: "undefined" },
    { c_id: code + "_4_1", status: "undefined" },
    { c_id: code + "_4_2", status: "undefined" },
    { c_id: code + "_4_3", status: "undefined" },
    { c_id: code + "_4_4", status: "undefined" },
    { c_id: code + "_5_1", status: "undefined" },
    { c_id: code + "_5_2", status: "undefined" },
    { c_id: code + "_5_3", status: "undefined" },
    { c_id: code + "_5_4", status: "undefined" },
    { c_id: code + "_5_5", status: "undefined" }
  ];
};

export const checkpoints_opportunity = [
  { c_id: "o_1_1", status: "undefined" },
  { c_id: "o_1_2", status: "undefined" },
  { c_id: "o_1_3", status: "undefined" },
  { c_id: "o_2_1", status: "undefined" },
  { c_id: "o_2_2", status: "undefined" },
  { c_id: "o_2_3", status: "undefined" },
  { c_id: "o_2_4", status: "undefined" },
  { c_id: "o_2_5", status: "undefined" },
  { c_id: "o_3_1", status: "undefined" },
  { c_id: "o_3_2", status: "undefined" },
  { c_id: "o_3_3", status: "undefined" },
  { c_id: "o_3_4", status: "undefined" },
  { c_id: "o_3_5", status: "undefined" },
  { c_id: "o_4_1", status: "undefined" },
  { c_id: "o_4_2", status: "undefined" },
  { c_id: "o_4_3", status: "undefined" },
  { c_id: "o_4_4", status: "undefined" },
  { c_id: "o_4_5", status: "undefined" },
  { c_id: "o_4_6", status: "undefined" },
  { c_id: "o_5_1", status: "undefined" },
  { c_id: "o_5_2", status: "undefined" },
  { c_id: "o_5_3", status: "undefined" },
  { c_id: "o_6_1", status: "undefined" },
  { c_id: "o_6_2", status: "undefined" }
];

export const checkpoints_stakeholders = [
  { c_id: "s_1_1", status: "undefined" },
  { c_id: "s_1_2", status: "undefined" },
  { c_id: "s_1_3", status: "undefined" },
  { c_id: "s_2_1", status: "undefined" },
  { c_id: "s_2_2", status: "undefined" },
  { c_id: "s_2_3", status: "undefined" },
  { c_id: "s_2_4", status: "undefined" },
  { c_id: "s_3_1", status: "undefined" },
  { c_id: "s_3_2", status: "undefined" },
  { c_id: "s_3_3", status: "undefined" },
  { c_id: "s_4_1", status: "undefined" },
  { c_id: "s_4_2", status: "undefined" },
  { c_id: "s_4_3", status: "undefined" },
  { c_id: "s_4_4", status: "undefined" },
  { c_id: "s_4_5", status: "undefined" },
  { c_id: "s_5_1", status: "undefined" },
  { c_id: "s_5_2", status: "undefined" },
  { c_id: "s_6_1", status: "undefined" },
  { c_id: "s_6_2", status: "undefined" }
];

export const checkpoints_product_vision = [
  { c_id: "v_1_1", status: "undefined" },
  { c_id: "v_1_2", status: "undefined" },
  { c_id: "v_1_3", status: "undefined" },
  { c_id: "v_2_1", status: "undefined" },
  { c_id: "v_2_2", status: "undefined" },
  { c_id: "v_2_3", status: "undefined" },
  { c_id: "v_3_1", status: "undefined" },
  { c_id: "v_3_2", status: "undefined" },
  { c_id: "v_4_1", status: "undefined" },
  { c_id: "v_4_2", status: "undefined" }
];

export const checkpoints_stakeholder_network = [
  { c_id: "n_1_1", status: "undefined" },
  { c_id: "n_1_2", status: "undefined" },
  { c_id: "n_1_3", status: "undefined" },
  { c_id: "n_1_4", status: "undefined" },
  { c_id: "n_2_1", status: "undefined" },
  { c_id: "n_2_2", status: "undefined" },
  { c_id: "n_2_3", status: "undefined" },
  { c_id: "n_3_1", status: "undefined" },
  { c_id: "n_3_2", status: "undefined" },
  { c_id: "n_3_3", status: "undefined" }
];

export const competencyCheckpoints = (code, people) => {
  const checkpoints_list = checkpoints(code);
  let team = [];
  people.map((member) => {
    team.push({ user: member, checkpoints: checkpoints_list });
  });

  return team;
};

export const createCompetency = (name, short, id, owner, people) => {
  return new Competency({
    name: name,
    a_id: id,
    owner: owner,
    people: competencyCheckpoints(short, people),
    notes: []
  });
};

export const createActivity = (name, id, owner) => {
  return new Activity({
    name: name,
    a_id: id,
    owner: owner,
    startDate: null,
    endDate: null,
    notes: [],
    tasks: []
  });
};
