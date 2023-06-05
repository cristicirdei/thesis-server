const UserModule = require("../models/user").default;
const User = UserModule.User;

import { ERROR_CODES } from "../util/errors";
import { hashPassword } from "../util/hashPassword";
import tokenGenerator from "../util/tokenGenerator";
import { getProjectData, userId } from "../database/databaseOperations";

/**
 * It takes in a request, response, and next function, and then creates a new user with the information
 * from the request body, hashes the password, and then saves the new user to the database.
 * </code>
 * @param req - request
 * @param res - {
 * @param next - A function to be called if the middleware wishes to pass control to the next
 * middleware in the stack.
 * @returns The user object is being returned.
 */
export const postUserSignup = async (req, res, next) => {
  const { email, name, role } = req.body;
  let { password } = req.body;
  password = await hashPassword(password);
  const user = new User({
    email: email,
    password: password,
    name: name,
    role: role
  });

  const newUser = await user.save();
  return res.status(ERROR_CODES.CREATED).send(newUser);
};

/**
 * It takes in a user's email and password, then returns a token.
 * </code>
 * @param req - request
 * @param res - is the response object
 * @param next - is a function that you can call to pass control to the next middleware function.
 * @returns The token is being returned.
 */
export const postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userId(email);
  console.log(user);

  const project = await getProjectData(user._id);
  let proj;
  console.log(project, project?.length);
  if (project?.length > 0) {
    proj = true;
  } else {
    proj = false;
  }

  const payload = {
    id: user,
    email: email,
    project: proj
  };
  const token = tokenGenerator(payload);
  return res.status(ERROR_CODES.SUCCESS).send({ token });
};
