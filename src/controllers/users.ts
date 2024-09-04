import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { IService, Service } from "../models";
import { generateJWT, HttpStatus } from "../helpers";

export const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let users!: IService[];

  try {
    [total, users] = await Promise.all([
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
    msg: "The list of users was successfully obtained",
    result: {
      total,
      users,
    },
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let userDB: IService | null;

  try {
    userDB = await Service.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!userDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The user with id: ${id} does not exist`,
      result: userDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The user with id: ${id} was successfully obtained`,
    result: userDB,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, ...restData } = req.body;

  let userDB: IService | null;

  try {
    userDB = await Service.findOne({ where: { email } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (userDB) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `There is already a user with the email ${email}`,
      result: {},
    });
  }

  let user!: IService;

  try {
    user = new Service({ email, password, ...restData });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  try {
    await user.save();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  //Todo: generar token
  const accessToken = generateJWT(user.id, email, user.role);

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "User created successfully",
    result: {
      token: accessToken,
      user,
    },
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  let user!: IService | null;

  try {
    user = await Service.findByPk(id);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!user) {
    return res.status(409).json({
      ok: false,
      msg: `The user with id: ${id} does not exist`,
      result: {},
    });
  }

  await user?.update({ ...req.body });

  await user?.save();

  return res.status(200).json({
    ok: true,
    msg: "User updated successfully",
    result: user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
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
    msg: "User deleted successfully",
    result: {},
  });
};
