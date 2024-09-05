import { Router } from "express";
import { uploadHandler } from "../middlewares";

export const uploadRouter = Router();

uploadRouter.post("/", uploadHandler);
