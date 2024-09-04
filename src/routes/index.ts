import { Express, Response } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./users";

interface Paths {
  services: string;
  users: string;
  auth: string;
}

const paths: Paths = {
  services: "/api/services",
  users: "/api/users",
  auth: "/api/auth",
};

export const apiRoutes = (app: Express) => {
  app.use(paths.auth, authRouter);
  app.use(paths.users, userRouter);
  //app.use(paths.services, serviceRouter);
  app.use(function (_, res: Response) {
    res.redirect("/");
  });
};
