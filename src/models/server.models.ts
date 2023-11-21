
import express, { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import {
  CaseActionRoute,
  OligoActionRoute,
  
  CaseCatalogRoute,
  DiseaseCatalogRoute,
  FederalEnityCatalogRoute,
  OligoCatalogRoute,
} from '../routes';
import pool, { AppDataSource } from "../database/config";
import { PORT_ENV } from "../config/enviroment";


class Server {
  private app: Application;
  private port: number;
  private pathsActions: {
    case: string;
    oligo: string;
  };
  private pathsCatalogs: {
    oligo: string;
    case: string;
    disease: string;
    federalEntity: string;
  };

  constructor() {
    this.app = express();
    this.port = PORT_ENV;
    this.pathsActions = {
      case: "/api/actions/case",
      oligo: "/api/actions/oligo",
    };
    this.pathsCatalogs = {
      oligo: "/api/catalogs/oligo",
      case: "/api/catalogs/case",
      disease: "/api/catalogs/disease",
      federalEntity: "/api/catalogs/federal-entity",
    };
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    try {
      await AppDataSource.initialize();
      console.log("Connected to the database successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.pathsActions.case, CaseActionRoute);
    this.app.use(this.pathsActions.oligo, OligoActionRoute);

    this.app.use(this.pathsCatalogs.oligo, OligoCatalogRoute);
    this.app.use(this.pathsCatalogs.case, CaseCatalogRoute);
    this.app.use(this.pathsCatalogs.disease, DiseaseCatalogRoute);
    this.app.use(this.pathsCatalogs.federalEntity, FederalEnityCatalogRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is running on port", this.port);
      console.log(`http://localhost:${this.port}/`);
    });
  }

}

export default Server;