import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
//import { User } from "../models";

interface ITokenPayload {
  uid: string;
  email: string;
  role: string;
}

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
      result: {},
    });
  }

  try {
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));

    const { uid } = decoded as ITokenPayload;

    console.log({ uid });

    // leer el usuario que corresponde al uid
    //const user = await User.findById(uid);

    next();
    return;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: `Invalid token - ${error}`,
    });
  }
};
