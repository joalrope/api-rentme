import { Request, Response } from "express";
import { IService, Service } from "../models";
import { HttpStatus } from "../helpers";

export const getServices = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let services!: IService[];

  try {
    [total, services] = await Promise.all([
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
    msg: "The list of services was successfully obtained",
    result: {
      total,
      services,
    },
  });
};

export const getService = async (req: Request, res: Response) => {
  const { id } = req.params;
  let serviceDB: IService | null;

  try {
    serviceDB = await Service.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!serviceDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The service with id: ${id} does not exist`,
      result: serviceDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The service with id: ${id} was successfully obtained`,
    result: serviceDB,
  });
};

export const createService = async (req: Request, res: Response) => {
  const { name, password, ...restData } = req.body;

  let servicesDB: IService | null;

  try {
    servicesDB = await Service.findOne({ where: { name } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (servicesDB) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `There is already a service with the email ${name}`,
      result: {},
    });
  }

  let service!: IService;

  try {
    service = new Service({ name, password, ...restData });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  // Guardar en BD
  try {
    await service.save();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Service created successfully",
    result: {
      service,
    },
  });
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;

  let service!: IService | null;

  try {
    service = await Service.findByPk(id);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!service) {
    return res.status(409).json({
      ok: false,
      msg: `The service with id: ${id} does not exist`,
      result: {},
    });
  }

  await service?.update({ ...req.body });

  await service?.save();

  return res.status(200).json({
    ok: true,
    msg: "Service updated successfully",
    result: service,
  });
};

export const deleteService = async (req: Request, res: Response) => {
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
    msg: "Service deleted successfully",
    result: {},
  });
};
