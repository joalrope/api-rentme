import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../helpers";
const { validationResult } = require("express-validator");

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: errors.errors[0].msg,
      result: { errors },
    });
  }
  next();
  return;
};
