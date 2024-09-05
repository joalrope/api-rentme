import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { propertyIdAlreadyExists } from "../helpers";
import {
  createProperty,
  getProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  getAvailableProperties,
} from "../controllers";

export const propertyRouter = Router();

propertyRouter.post(
  "/",
  [
    body("title", "title is required").not().isEmpty(),
    body("description", "description is required").not().isEmpty(),
    body("address", "address is required").not().isEmpty(),
    body("city", "city is required").not().isEmpty(),
    body("owner", "owner is required").not().isEmpty(),
    body("phone", "phone is required").not().isEmpty(),
    body("totalArea", "totalArea is required").not().isEmpty(),
    body("totalArea", "totalArea is not a valid value").isNumeric(),
    body("rooms", "rooms is required").not().isEmpty(),
    body("rooms", "rooms is not a valid value").isNumeric(),
    body("toilets", "toilets is required").not().isEmpty(),
    body("toilets", "toilets is not a valid value").isNumeric(),
    body("antiquity", "antiquity is required").not().isEmpty(),
    body("antiquity", "antiquity is not a valid value").isNumeric(),
    body("rentalPrice", "rentalPrice is required").not().isEmpty(),
    body("rentalPrice", "rentalPrice is not a valid value").isNumeric(),

    validateFields,
  ],
  createProperty
);

propertyRouter.get("/", getProperties);
propertyRouter.get(
  "/:id",
  [check("id").custom(propertyIdAlreadyExists), validateFields],
  getProperty
);

propertyRouter.get("/search", [], getAvailableProperties);

propertyRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(propertyIdAlreadyExists),
    validateFields,
  ],
  updateProperty
);

propertyRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(propertyIdAlreadyExists),
    validateFields,
  ],
  deleteProperty
);
