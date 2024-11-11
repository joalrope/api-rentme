import {
  Availability,
  Image,
  Property,
  Booking,
  Service,
  User,
  Category,
} from "../models";

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

export const bookingIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const bookingDB = await Booking.findByPk(id);

  if (!bookingDB) {
    throw new Error(`Booking with id: ${id} does not exist`);
  }
};

export const serviceIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const serviceDB = await Service.findByPk(id);

  if (!serviceDB) {
    throw new Error(`Service with id: ${id} does not exist`);
  }
};

export const imageIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const imageDB = await Image.findByPk(id);

  if (!imageDB) {
    throw new Error(`Image with id: ${id} does not exist`);
  }
};

export const availabilityIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const availabilityDB = await Availability.findByPk(id);

  if (!availabilityDB) {
    throw new Error(`Availability with id: ${id} does not exist`);
  }
};
export const categoryIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const categoryDB = await Category.findByPk(id);

  if (!categoryDB) {
    throw new Error(`Category with id: ${id} does not exist`);
  }
};
