import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { serviceIdAlreadyExists } from "../helpers";
import {
  createService,
  getService,
  getServices,
  updateService,
  deleteService,
} from "../controllers";

export const serviceRouter = Router();

serviceRouter.post(
  "/",
  [
    body("title", "title is required").not().isEmpty(),
    body("description", "description is required").not().isEmpty(),
    body("address", "address is required").not().isEmpty(),
    body("city", "city is required").not().isEmpty(),
    body("owner", "owner is required").not().isEmpty(),
    body("phone", "phone is required").not().isEmpty(),
    body("servicePrice", "servicePrice is required").not().isEmpty(),
    body("servicePrice", "servicePrice is not a valid value").isNumeric(),

    validateFields,
  ],
  createService
);

serviceRouter.get("/", getServices);
serviceRouter.get(
  "/:id",
  [check("id").custom(serviceIdAlreadyExists), validateFields],
  getService
);

serviceRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(serviceIdAlreadyExists),
    validateFields,
  ],
  updateService
);

serviceRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(serviceIdAlreadyExists),
    validateFields,
  ],
  deleteService
);
