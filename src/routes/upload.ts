import { Router } from "express";
import { uploader } from "../middlewares";
import { HttpStatus } from "../helpers";

export const uploadRouter = Router();

uploadRouter.post("/cloudinary", uploader, (req, res) => {
  if (req.file) {
    console.log({ image: req.file });

    res.status(HttpStatus.OK).json({
      url: req.file?.path,
      name: req.file?.originalname,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Could not upload image");
  }
});
