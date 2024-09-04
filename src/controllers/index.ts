import { Response } from "express";
export { changePassword, forgotPassword, login } from "./auth";
export { createUser, getUsers, getUser } from "./users";

export interface IResponse {
  ok: boolean;
  msg: string;
  result: any;
}

export const returnErrorStatus = (
  error: any,
  res: Response,
  adic: string = ""
) => {
  const response: IResponse = {
    ok: false,
    msg: "Please talk to the administrator",
    result: { error, adic },
  };
  return res.status(500).json(response);
};
