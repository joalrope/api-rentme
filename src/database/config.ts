import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import bcryptjs from "bcryptjs";

import { Property, Reservation, Service, User } from "../models";

config();

const host = String(process.env.HOSTDB);
const port = Number(process.env.PORTDB);
const database = String(process.env.DATABASE);
const username = String(process.env.USERNAMEDB);
const password = String(process.env.PASSWORD);

export const sequelize = new Sequelize({
  host,
  port,
  database,
  username,
  password,
  dialect: "postgres",
  models: [Property, Reservation, Service, User],
});

export const seedDB = async () => {
  // run seed

  await Property.truncate();
  await Reservation.truncate();
  await Service.truncate();
  await User.truncate();

  await User.create({
    firstName: "Pedro",
    lastName: "Larez",
    email: "pelarez@hotmail.com",
    password: bcryptjs.hashSync("123456", bcryptjs.genSaltSync()),
    phone: "+563583584679",
  });

  await User.create({
    firstName: "José",
    lastName: "Rodríguez",
    email: "joalrope@gmail.com",
    password: bcryptjs.hashSync("123456", bcryptjs.genSaltSync()),
    phone: "+584148698680",
  });

  console.log("Database seeded successfully");
};
