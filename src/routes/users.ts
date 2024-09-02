import { Router } from "express";
import { body, check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { userIdAlreadyExists } from "../helpers";
import /*createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByEmail,*/
"../controllers";

export const userRouter = Router();

userRouter.post(
  "/",
  [
    body("names", "Names is required").not().isEmpty(),
    body("password", "The password must be more than 6 letters").isLength({
      min: 6,
    }),
    body("email", "The email is invalid").isEmail(),
    validateFields,
  ]
  //createUser
);

userRouter.get("/" /*getUsers*/);
userRouter.get("/email/:email" /*getUsersByEmail*/);
userRouter.get(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ]
  //getUser
);

userRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ]
  //updateUser
);

userRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "You must provide an ID").notEmpty(),
    check("id", "Not a valid ID ").isMongoId(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ]
  //deleteUser
);
