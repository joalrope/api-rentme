import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { reservationIdAlreadyExists } from "../helpers";
import {
  createReservation,
  getReservation,
  getProperties,
  updateReservation,
  deleteReservation,
} from "../controllers";

export const reservationRouter = Router();

reservationRouter.post(
  "/",
  [
    body("userId", "userId is required").not().isEmpty(),
    body("userId", "userId is not valid").isUUID(),
    body("propertyId", "propertyId is requireed").not().isEmpty(),
    body("propertyId", "propertyId is not valid").isUUID(),
    body("startDate", "startDate is required").not().isEmpty(),
    body("startDate", "startDate is not a valid date").isDate(),
    body("endDate", "endDate is required").not().isEmpty(),
    body("endDate", "endDate is not a valid date").isDate(),
    body("price", "price is required").not().isEmpty(),
    body("price", "price is not a valid number").isNumeric(),
    validateFields,
  ],
  createReservation
);

reservationRouter.get("/", getProperties);
reservationRouter.get(
  "/:id",
  [check("id").custom(reservationIdAlreadyExists), validateFields],
  getReservation
);

reservationRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(reservationIdAlreadyExists),
    validateFields,
  ],
  updateReservation
);

reservationRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(reservationIdAlreadyExists),
    validateFields,
  ],
  deleteReservation
);
