import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import {
  Availability,
  Image,
  Property,
  Reservation,
  Service,
  User,
} from "../models";

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
  logging: true,
  models: [Availability, Image, Property, Reservation, Service, User],
});
