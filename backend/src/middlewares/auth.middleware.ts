import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../interfaces/user.interface";
import { DatabaseHelper } from "../utils/db.util";
import dotenv from "dotenv";
import { CreateLog } from "../utils/logger.util";
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
): Promise<any> => {
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
      const user = (await _db.exec("usp_FindUserById", { id: decoded.id }))
        .recordset[0] as User;
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized, user no longer exists" });
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, JWT failed" });
      CreateLog.error(error);
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no JWT }" });
  }
};

// Check if user is admin - protects admin routes
export const authorizeAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): any => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden, not authorized to perform action" });
  }
};
