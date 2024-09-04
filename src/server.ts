import express, { Express } from "express";
import { createServer } from "http";
import { config } from "dotenv";
import cors from "cors";
import { sequelize, seedDB } from "./database/config";
import { apiRoutes } from "./routes";

config();

const dbClear = String(process.env.DB_CLEAR);

export class Server {
  app: Express;
  port: string | undefined;
  server: any;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || "8080";

    // Database connection
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Application routes
    apiRoutes(this.app);

    // seed database with first data
    if (dbClear === "true") {
      seedDB();
    }
  }

  async connectDB() {
    try {
      await sequelize.sync({ force: true, alter: true });
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  middlewares() {
    // CORS
    const origin = [
      String(process.env.URL_BASE1),
      String(process.env.URL_BASE2),
    ];

    this.app.use(
      cors({
        origin,
      })
    );

    // Reading and parsing the body
    this.app.use(express.json());

    // statics Directories
    this.app.use(express.static("public"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
