import { Request, Response } from "express";
import { Availability, Image, Property } from "../models";
import { HttpStatus } from "../helpers";
import { generateSlugify } from "../helpers/slugify";

export const getProperties = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let properties!: Property[] | null;

  try {
    [total, properties] = await Promise.all([
      Property.count({ include: [Availability, Image] }),
      Property.findAll({
        include: [Availability, Image],
        offset: Number(from),
        limit: Number(limit),
      }),
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
    msg: "The list of properties was successfully obtained!!",
    result: {
      total,
      properties,
    },
  });
};

export const getProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  let propertyDB: Property | null;

  try {
    propertyDB = await Property.findByPk(id, {
      include: [Availability, Image],
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!propertyDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The property with id: ${id} does not exist`,
      result: propertyDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The property with id: ${id} was successfully obtained`,
    result: propertyDB,
  });
};

export const createProperty = async (req: Request, res: Response) => {
  let property: Property;
  const { title, ...restData } = req.body;

  const slug = generateSlugify(title);

  try {
    property = await Property.create({ title, slug, ...restData });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Property created successfully",
    result: {
      property,
    },
  });
};

export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;

  let property!: Property | null;

  try {
    property = await Property.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!property) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The property with id: ${id} does not exist`,
      result: {},
    });
  }

  await property?.update({ ...req.body });

  await property?.save();

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Property updated successfully",
    result: property,
  });
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Property.destroy({ where: { id } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Property deleted successfully",
    result: {},
  });
};

export const getAvailableProperties = async (_req: Request, res: Response) => {
  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Available Properties",
    result: {},
  });
};
