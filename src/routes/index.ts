import { Express, Response } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { propertyRouter } from "./property";
import { serviceRouter } from "./service";
import { reservationRouter } from "./reservation";
import { imageRouter } from "./image";
import { availabilityRouter } from "./availability";

interface Paths {
  availability: string;
  reservations: string;
  properties: string;
  services: string;
  images: string;
  users: string;
  auth: string;
}

const paths: Paths = {
  availability: "/api/availability",
  reservations: "/api/reservations",
  properties: "/api/properties",
  services: "/api/services",
  images: "/api/images",
  users: "/api/users",
  auth: "/api/auth",
};

export const apiRoutes = (app: Express) => {
  app.use(paths.availability, availabilityRouter);
  app.use(paths.reservations, reservationRouter);
  app.use(paths.properties, propertyRouter);
  app.use(paths.services, serviceRouter);
  app.use(paths.images, imageRouter);
  app.use(paths.users, userRouter);
  app.use(paths.auth, authRouter);
  app.use(function (_, res: Response) {
    res.redirect("/");
  });
};
