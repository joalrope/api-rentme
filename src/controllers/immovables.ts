import { Request, Response } from "express";
import { IService, Service } from "../models";
import { HttpStatus } from "../helpers";

export const getImmovables = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let immovables!: IService[];

  try {
    [total, immovables] = await Promise.all([
      Service.count(),
      Service.findAll({ offset: Number(from), limit: Number(limit) }),
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
    msg: "The list of immovables was successfully obtained",
    result: {
      total,
      immovables,
    },
  });
};

export const getImmovable = async (req: Request, res: Response) => {
  const { id } = req.params;
  let immovablesDB: IService | null;

  try {
    immovablesDB = await Service.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!immovablesDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The immovable with id: ${id} does not exist`,
      result: immovablesDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The immovable with id: ${id} was successfully obtained`,
    result: immovablesDB,
  });
};

export const createImmovable = async (req: Request, res: Response) => {
  const { email, password, ...restData } = req.body;

  let immovablesDB: IService | null;

  try {
    immovablesDB = await Service.findOne({ where: { email } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (immovablesDB) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `There is already a immovable with the email ${email}`,
      result: {},
    });
  }

  let immovable!: IService;

  try {
    immovable = new Service({ email, password, ...restData });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  // Guardar en BD
  try {
    await immovable.save();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Immovable created successfully",
    result: {
      immovable,
    },
  });
};

export const updateImmovable = async (req: Request, res: Response) => {
  const { id } = req.params;

  let immovable!: IService | null;

  try {
    immovable = await Service.findByPk(id);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!immovable) {
    return res.status(409).json({
      ok: false,
      msg: `The immovable with id: ${id} does not exist`,
      result: {},
    });
  }

  await immovable?.update({ ...req.body });

  await immovable?.save();

  return res.status(200).json({
    ok: true,
    msg: "Immovable updated successfully",
    result: immovable,
  });
};

export const deleteImmovable = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Service.destroy({ where: { id } });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(202).json({
    ok: true,
    msg: "Immovable deleted successfully",
    result: {},
  });
};
