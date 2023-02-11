import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authroute from "./router/auth-routes";
dotenv.config({ path: __dirname + "/../.env" });

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(json());

// Routes
app.use("/auth", authroute);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
