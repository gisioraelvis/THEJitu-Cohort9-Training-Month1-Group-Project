import mssql from "mssql";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

// MSSQL config
export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "172.17.0.1", // Connect to docker container
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

// Test connection to MSSQL database
export const connectToMSSQL = async () => {
  try {
    const c = await mssql.connect(sqlConfig);
    if (c.connected) {
      console.log("Connected to MSSQL database!");
    }
  } catch (error) {
    console.log(error);
  }
};
