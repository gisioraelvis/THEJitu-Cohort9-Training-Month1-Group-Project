import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const jwtSecret = process.env.JWT_SECRET as string;

// Generate JWT token
export const generateJWT = (payload: any) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "1d",
  });
};
