import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import {
  availabilityIdAlreadyExists,
  propertyIdAlreadyExists,
} from "../helpers";
import {
  createAvailability,
  getAvailability,
  getAvailabilities,
  updateAvailability,
  deleteAvailability,
} from "../controllers";

export const availabilityRouter = Router();

availabilityRouter.post(
  "/",
  [
    body("start", "start is required").not().isEmpty(),
    body("start", "start must be a date").isDate(),
    body("end", "end is required").not().isEmpty(),
    body("end", "end must be a date").isDate(),
    body("propertyId", "propertyId is required").not().isEmpty(),
    body("propertyId", "propertyId must be a valid UUID").isUUID(),
    body("propertyId").custom(propertyIdAlreadyExists),
    validateFields,
  ],
  createAvailability
);

availabilityRouter.get("/", getAvailabilities);
availabilityRouter.get(
  "/:id",
  [check("id").custom(availabilityIdAlreadyExists), validateFields],
  getAvailability
);

availabilityRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(availabilityIdAlreadyExists),
    validateFields,
  ],
  updateAvailability
);

availabilityRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(availabilityIdAlreadyExists),
    validateFields,
  ],
  deleteAvailability
);
