import { Express, Response } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { propertyRouter } from "./property";
import { serviceRouter } from "./service";
import { bookingRouter } from "./booking";
import { imageRouter } from "./image";
import { availabilityRouter } from "./availability";
import { uploadRouter } from "./upload";
import { categoryRouter } from "./category";

interface Paths {
  availability: string;
  categories: string;
  properties: string;
  bookings: string;
  services: string;
  upload: string;
  images: string;
  users: string;
  auth: string;
}

const paths: Paths = {
  availability: "/api/availability",
  categories: "/api/categories",
  properties: "/api/properties",
  bookings: "/api/bookings",
  services: "/api/services",
  upload: "/api/uploads",
  images: "/api/images",
  users: "/api/users",
  auth: "/api/auth",
};

export const apiRoutes = (app: Express) => {
  app.use(paths.availability, availabilityRouter);
  app.use(paths.categories, categoryRouter);
  app.use(paths.properties, propertyRouter);
  app.use(paths.bookings, bookingRouter);
  app.use(paths.services, serviceRouter);
  app.use(paths.upload, uploadRouter);
  app.use(paths.images, imageRouter);
  app.use(paths.users, userRouter);
  app.use(paths.auth, authRouter);
  app.use(function (_, res: Response) {
    res.redirect("/");
  });
};
