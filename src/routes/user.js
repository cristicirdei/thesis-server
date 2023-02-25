import Router from "express";
import { postUserSignup, postUserLogin } from "../controllers/user";

import loginValidation from "../middleware/loginValidation";
import signUpValidation from "../middleware/signUpValidation";

const userRouter = new Router();

userRouter.post("/signup", signUpValidation, postUserSignup);
userRouter.post("/login", loginValidation, postUserLogin);

export default userRouter;
