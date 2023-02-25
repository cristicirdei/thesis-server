import express from "express";
import cors from "cors";
import * as OpenApiValidator from "express-openapi-validator";
import errorMiddleware from "../middleware/errorMiddleware";

import healthRouter from "../routes/health";
import activityRouter from "../routes/activity";
import competencyRouter from "../routes/competency";
import userRouter from "../routes/user";
import projectRouter from "../routes/project";
import objectiveRouter from "../routes/objective";

export class Server {
  app = null;

  bootstrap() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cors());

    /* const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "production";
    if (IS_NOT_PRODUCTION) {
      this.app.use("/docs", serve, setup(swaggerDocument));
    }*/

    //  Swagger error validator
    /* this.app.use(
      OpenApiValidator.middleware({
        apiSpec: swaggerDocument,
        validateRequests: true,
        validateResponses: true,
      })
    );*/

    //  Declaring API routes
    this.app.use("/health", healthRouter);
    this.app.use("/user", userRouter);
    this.app.use("/project", projectRouter);
    this.app.use("/activity", activityRouter);
    this.app.use("/competency", competencyRouter);
    this.app.use("/objective", objectiveRouter);

    //  Error handling
    this.app.use(errorMiddleware);
  }
  listen(port) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}
