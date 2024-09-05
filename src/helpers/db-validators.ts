import { Property, Reservation, Service, User } from "../models";

export const emailAlreadyExists = async (email: string = "") => {
  // Verificar si el correo existe
  const emailDB = await User.findOne({
    where: { email },
  });

  if (emailDB) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

export const userIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const userDB = await User.findByPk(id);

  if (!userDB) {
    throw new Error(`User with id: ${id} does not exist`);
  }
};

export const propertyIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const propertyDB = await Property.findByPk(id);

  if (!propertyDB) {
    throw new Error(`Property with id: ${id} does not exist`);
  }
};

export const reservationIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const reservationDB = await Reservation.findByPk(id);

  if (!reservationDB) {
    throw new Error(`Reservation with id: ${id} does not exist`);
  }
};

export const serviceIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const serviceDB = await Service.findByPk(id);

  if (!serviceDB) {
    throw new Error(`Service with id: ${id} does not exist`);
  }
};
