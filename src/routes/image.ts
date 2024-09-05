import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { imageIdAlreadyExists, propertyIdAlreadyExists } from "../helpers";
import {
  createImage,
  getImage,
  getImages,
  updateImage,
  deleteImage,
} from "../controllers";

export const imageRouter = Router();

imageRouter.post(
  "/",
  [
    body("pos", "pos is required").not().isEmpty(),
    body("pos", "pos must be a number").isNumeric(),
    body("url", "url is required").not().isEmpty(),
    body("url", "url must be a valid url").isURL(),
    body("propertyId", "propertyId is required").not().isEmpty(),
    body("propertyId", "propertyId must be a valid UUID").isUUID(),
    body("propertyId").custom(propertyIdAlreadyExists),
    validateFields,
  ],
  createImage
);

imageRouter.get("/", getImages);
imageRouter.get(
  "/:id",
  [check("id").custom(imageIdAlreadyExists), validateFields],
  getImage
);

imageRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(imageIdAlreadyExists),
    validateFields,
  ],
  updateImage
);

imageRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(imageIdAlreadyExists),
    validateFields,
  ],
  deleteImage
);
