import { RequestHandler, Request, Response } from "express";
import { v4 as uid } from "uuid";
import {
  ResetPasswordSchema,
  RegistrationSchema,
} from "../utils/joi-validator";
import { DecodedData, User } from "../models/user";
import Bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import { DatabaseHelper } from "../utils/database-helpers";

const _db = new DatabaseHelper();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface ExtendedRequest extends Request {
  body: {
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
  };
  info?: DecodedData;
}

export async function RegisterUser(req: ExtendedRequest, res: Response) {
  try {
    const id = uid();
    const { Name, Email, Password } = req.body;
    const { error } = RegistrationSchema.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    const passwordHash = await Bcrypt.hash(Password, 10);

    // Save the user to the database
    await _db.exec("RegisterUser", {
      id,
      name: Name,
      email: Email,
      password: passwordHash,
    });

    // Create a token
    const payload = { Id: id, Name, Email, Role: "User" };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "3600s",
    });

    // Send back the user a JWT token as the response.
    return res.status(201).json({ message: "User Registered!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Reset User Password
export async function ResetPassword(req: ExtendedRequest, res: Response) {
  try {
    const { Password } = req.body;
    const { Id } = req.info as DecodedData;
    const { error } = ResetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    const passwordHash = await Bcrypt.hash(Password, 10);
    await _db.exec("ResetPassword", { id: Id, password: passwordHash });
    return res.status(200).json({ message: "Password Reset Successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Search users by name
export async function SearchUser(req: ExtendedRequest, res: Response) {
  try {
    const { username } = req.query as { username: string };
    const user: User[] = await (
      await _db.exec("SearchUsersByName", { name: username })
    ).recordset;
    if (!user[0]) {
      return res.status(404).json({ error: "User Not found" });
    }
    const payload = user.map((item) => {
      const { Password, ...rest } = item;
      return rest;
    });
    return res.status(200).json({ message: "User found!", payload });
  } catch (error) {
    res.status(500).json(error);
  }
}
