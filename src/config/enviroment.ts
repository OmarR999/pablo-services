export const SERVER_DATABASE_ENV = process.env.SERVER_DATABASE || 'localhost';
export const PORT_DATABASE_ENV = parseInt(process.env.PORT_DATABASE || "3306") as number;
export const USER_NAME_DATABASE_ENV = process.env.USER_NAME_DATABASE || 'root';
export const PASSWORD_DATABASE_ENV = process.env.PASSWORD_DATABASE || '';
export const NAME_DATABASE_ENV = process.env.NAME_DATABASE || 'db_pablo';

export const PORT_ENV = Number(process.env.PORT) || 8080;
