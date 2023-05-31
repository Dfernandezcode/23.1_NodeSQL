// CONNECTION TO SQL DATABASE PARAMETERS.

// use quickfix option to update import mysql
import mysql, { type Connection, type ConnectionOptions } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// dotenv config passed to string.
const SQL_HOST: string = process.env.SQL_HOST as string;
const SQL_USER: string = process.env.SQL_USER as string;
const SQL_PASSWORD: string = process.env.SQL_PASSWORD as string;
const SQL_DATABASE: string = process.env.SQL_DATABASE as string;

// connection configuration.
const config: ConnectionOptions = {
  host: SQL_HOST,
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
};

// async function that handles db connection.

export const sqlConnect = async (): Promise<Connection> => {
  const connection: Connection = await mysql.createConnection(config);
  return connection;
};

// get results
export const sqlQuery = async (sqlQuery: string): Promise<any> => {
  const connection = await sqlConnect();
  const [results] = await connection.execute(sqlQuery);
  return results;
};
