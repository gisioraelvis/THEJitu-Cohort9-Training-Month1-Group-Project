import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../interfaces/user.interface";
import { DatabaseHelper } from "../utils/database-helpers";
import dotenv from "dotenv";
import { CreateLog } from "../utils/logger";
dotenv.config({ path: __dirname + "../../.env" });

const _db = new DatabaseHelper();

/**
 * @description - Middleware to protect routes that require authentication
 * Validates JWT token and checks if user exist and is logged in
 */
export const authenticateUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET as string;

      // Verify token
      const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

      // Check if user still exists
      const user = (await _db.exec("FindUserById", { id: decoded.Id }))
        .recordset[0] as User;
      if (!user) {
        res
          .status(401)
          .json({ message: "Not authorized, user no longer exists" });
      }

      req.user = user;

      next();
    } catch (error) {
      CreateLog.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Check if user is admin - protects admin routes
export const authorizeAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};