//import { User } from "../models";

export const emailAlreadyExists = async (email: string = "") => {
  // Verificar si el correo existe
  //const emailDB = await User.findOne().then((user) => {
  //  if (user?.email === email) {
  //    return user?.email;
  //  }
  //});

  const emailDB = email;

  if (emailDB) {
    throw new Error(`The email: {{email}}, is already registered`);
  }
};

export const userIdAlreadyExists = async (id: string) => {
  // Verificar si el id existe
  //const userDB = await User.findOne().then({ user => {
  //  return userIdAlreadyExists.id
  //}});

  const userDB = {};

  if (!userDB) {
    throw new Error(`User with id: ${id} does not exist`);
  }
};
