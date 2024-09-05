import { Request, Response } from "express";
import { IReservation, Reservation } from "../models";
import { HttpStatus } from "../helpers";

export const getReservations = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let reservations!: IReservation[];

  try {
    [total, reservations] = await Promise.all([
      Reservation.count(),
      Reservation.findAll({ offset: Number(from), limit: Number(limit) }),
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
    msg: "The list of reservations was successfully obtained",
    result: {
      total,
      reservations,
    },
  });
};

export const getReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  let reservationDB: IReservation | null;

  try {
    reservationDB = await Reservation.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!reservationDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The reservation with id: ${id} does not exist`,
      result: reservationDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The reservation with id: ${id} was successfully obtained`,
    result: reservationDB,
  });
};

export const createReservation = async (req: Request, res: Response) => {
  let reservation!: IReservation;

  try {
    reservation = new Reservation({ ...req.body });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  try {
    await reservation.save();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Reservation created successfully",
    result: {
      reservation,
    },
  });
};

export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  let reservation!: IReservation | null;

  try {
    reservation = await Reservation.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!reservation) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The reservation with id: ${id} does not exist`,
      result: {},
    });
  }

  await reservation?.update({ ...req.body });

  await reservation?.save();

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Reservation updated successfully",
    result: reservation,
  });
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Reservation.destroy({ where: { id } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Reservation deleted successfully",
    result: {},
  });
};
