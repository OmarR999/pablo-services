
import { DataSource } from "typeorm";

import {
  NAME_DATABASE_ENV,
  PASSWORD_DATABASE_ENV,
  PORT_DATABASE_ENV,
  SERVER_DATABASE_ENV,
  USER_NAME_DATABASE_ENV,
} from '../config/enviroment';

import * as entities from "../entity/index";


export const AppDataSource = new DataSource({
  extra: {
    supportBigNumbers: true,
    decimalNumbers: false,
  },
  type: "mysql",
  host: SERVER_DATABASE_ENV,
  username: USER_NAME_DATABASE_ENV,
  password: PASSWORD_DATABASE_ENV,
  database: NAME_DATABASE_ENV,
  port: PORT_DATABASE_ENV,
  synchronize: true,
  entities,
});

export default AppDataSource;
