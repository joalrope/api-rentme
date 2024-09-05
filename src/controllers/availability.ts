import { Request, Response } from "express";
import { Availability, IAvailability } from "../models";
import { HttpStatus } from "../helpers";

export const getAvailabilities = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let availabilities!: IAvailability[];

  try {
    [total, availabilities] = await Promise.all([
      Availability.count(),
      Availability.findAll({ offset: Number(from), limit: Number(limit) }),
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
    msg: "The list of availabilities was successfully obtained!!",
    result: {
      total,
      availabilities,
    },
  });
};

export const getAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  let availabilityDB: IAvailability | null;

  try {
    availabilityDB = await Availability.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!availabilityDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The availability with id: ${id} does not exist`,
      result: availabilityDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The availability with id: ${id} was successfully obtained`,
    result: availabilityDB,
  });
};

export const createAvailability = async (req: Request, res: Response) => {
  let availability: IAvailability;

  console.log({ data: req.body });

  try {
    availability = await Availability.create({ ...req.body });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Availability created successfully",
    result: {
      availability,
    },
  });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;

  let availability!: IAvailability | null;

  try {
    availability = await Availability.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!availability) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The availability with id: ${id} does not exist`,
      result: {},
    });
  }

  await availability?.update({ ...req.body });

  await availability?.save();

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Availability updated successfully",
    result: availability,
  });
};

export const deleteAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Availability.destroy({ where: { id } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Availability deleted successfully",
    result: {},
  });
};
