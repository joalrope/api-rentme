import { Request, Response } from "express";
import { Image, IImage } from "../models";
import { HttpStatus } from "../helpers";

export const getImages = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let images!: IImage[];

  try {
    [total, images] = await Promise.all([
      Image.count(),
      Image.findAll({ offset: Number(from), limit: Number(limit) }),
    ]);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "The list of images was successfully obtained!!",
    result: {
      total,
      images,
    },
  });
};

export const getImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  let imageDB: IImage | null;

  try {
    imageDB = await Image.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!imageDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The image with id: ${id} does not exist`,
      result: imageDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The image with id: ${id} was successfully obtained`,
    result: imageDB,
  });
};

export const createImage = async (req: Request, res: Response) => {
  let image: IImage;
  const { url, ...restData } = req.body;

  const imageDB = await Image.findOne({ where: { url } });

  if (imageDB) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The image with url: ${url} already exist`,
      result: {},
    });
  }

  try {
    image = new Image({ url, ...restData });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  try {
    await image.save();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Image created successfully",
    result: {
      image,
    },
  });
};

export const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  let image!: IImage | null;

  try {
    image = await Image.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!image) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The image with id: ${id} does not exist`,
      result: {},
    });
  }

  await image?.update({ ...req.body });

  await image?.save();

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Image updated successfully",
    result: image,
  });
};

export const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Image.destroy({ where: { id } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Image deleted successfully",
    result: {},
  });
};
