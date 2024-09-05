import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../helpers";
import { User } from "../models";

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
    return res.status(HttpStatus.UNAUTHORIZED).json({
      ok: false,
      msg: "No hay token en la petición",
      result: {},
    });
  }

  try {
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));

    const { uid } = decoded as ITokenPayload;

    // leer el usuario que corresponde al uid
    const user = await User.findByPk(uid);

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }

    console.log("token valido");

    next();
    return;
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.UNAUTHORIZED).json({
      msg: `Invalid token - ${error}`,
    });
  }
};
