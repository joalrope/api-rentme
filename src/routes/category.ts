import { Router } from "express";
import { body, check } from "express-validator";
import { validateFields, validateJWT } from "../middlewares";
import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers";
import { categoryIdAlreadyExists } from "../helpers";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  [
    body("name", "name is required").not().isEmpty(),
    body("ellipsis", "name is required").not().isEmpty(),
    body("icon", "name is required").not().isEmpty(),
    body("pictureUrl", "name is required").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

categoryRouter.get("/", getCategories);
categoryRouter.get(
  "/:id",
  [check("id").custom(categoryIdAlreadyExists), validateFields],
  getCategory
);

categoryRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(categoryIdAlreadyExists),
    validateFields,
  ],
  updateCategory
);

categoryRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(categoryIdAlreadyExists),
    validateFields,
  ],
  deleteCategory
);
