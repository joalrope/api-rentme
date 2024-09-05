import { Response } from "express";
import { HttpStatus } from "../helpers";
export { changePassword, forgotPassword, login } from "./auth";
export { createUser, getUsers, getUser, updateUser, deleteUser } from "./users";
export {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getAvailableProperties,
} from "./property";
export {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "./service";
export {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} from "./reservation";
export {
  createImage,
  getImages,
  getImage,
  updateImage,
  deleteImage,
} from "./image";

export {
  createAvailability,
  getAvailabilities,
  getAvailability,
  updateAvailability,
  deleteAvailability,
} from "./availability";

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
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
};
