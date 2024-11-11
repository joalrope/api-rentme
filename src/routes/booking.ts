import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { bookingIdAlreadyExists } from "../helpers";
import {
  createBooking,
  getBooking,
  getProperties,
  updateBooking,
  deleteBooking,
} from "../controllers";

export const bookingRouter = Router();

bookingRouter.post(
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
  createBooking
);

bookingRouter.get("/", getProperties);
bookingRouter.get(
  "/:id",
  [check("id").custom(bookingIdAlreadyExists), validateFields],
  getBooking
);

bookingRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(bookingIdAlreadyExists),
    validateFields,
  ],
  updateBooking
);

bookingRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(bookingIdAlreadyExists),
    validateFields,
  ],
  deleteBooking
);
