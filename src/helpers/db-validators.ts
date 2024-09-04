import { Service } from "../models";

export const emailAlreadyExists = async (email: string = "") => {
  // Verificar si el correo existe
  const emailDB = await Service.findOne({
    where: { email },
  });

  if (emailDB) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

export const userIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  const userDB = await Service.findByPk(id);

  if (!userDB) {
    throw new Error(`User with id: ${id} does not exist`);
  }
};
