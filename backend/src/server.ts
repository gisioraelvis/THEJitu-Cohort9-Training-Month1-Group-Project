import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authroute from "./router/auth-routes";
import { notFound, errorHandler } from "./middlewares/global-error.middleware";
dotenv.config({ path: __dirname + "/../.env" });

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authroute);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
