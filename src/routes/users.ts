import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { emailAlreadyExists, userIdAlreadyExists } from "../helpers";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  /*getUsersByEmail,*/
} from "../controllers";

export const userRouter = Router();

userRouter.post(
  "/",
  [
    body("fullname", "fullname is required").not().isEmpty(),
    body("email", "The email is invalid").isEmail(),
    body("email").custom(emailAlreadyExists),
    body("phone", "phone is required").not().isEmpty(),
    body("password", "The password must be more than 6 letters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

userRouter.get("/", getUsers);
userRouter.get(
  "/:id",
  [check("id").custom(userIdAlreadyExists), validateFields],
  getUser
);

userRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isUUID(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ],
  updateUser
);

userRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isUUID(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ],
  deleteUser
);
