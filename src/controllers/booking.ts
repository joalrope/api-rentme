import { Request, Response } from "express";
import { IBooking, Booking } from "../models";
import { HttpStatus } from "../helpers";

export const getBookings = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let bookings!: IBooking[];

  try {
    [total, bookings] = await Promise.all([
      Booking.count(),
      Booking.findAll({ offset: Number(from), limit: Number(limit) }),
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
    msg: "The list of bookings was successfully obtained",
    result: {
      total,
      bookings,
    },
  });
};

export const getBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  let bookingDB: IBooking | null;

  try {
    bookingDB = await Booking.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!bookingDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The booking with id: ${id} does not exist`,
      result: bookingDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The booking with id: ${id} was successfully obtained`,
    result: bookingDB,
  });
};

export const createBooking = async (req: Request, res: Response) => {
  let booking!: IBooking;

  try {
    booking = new Booking({ ...req.body });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  try {
    await booking.save();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Booking created successfully",
    result: {
      booking,
    },
  });
};

export const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  let booking!: IBooking | null;

  try {
    booking = await Booking.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!booking) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The booking with id: ${id} does not exist`,
      result: {},
    });
  }

  await booking?.update({ ...req.body });

  await booking?.save();

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Booking updated successfully",
    result: booking,
  });
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Booking.destroy({ where: { id } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Booking deleted successfully",
    result: {},
  });
};
