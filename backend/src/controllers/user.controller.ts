import { RequestHandler, Request, Response } from "express";
import { v4 as uid } from "uuid";
import {
  UserPasswordResetDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdateProfileDto,
} from "../dtos/user.dto";
import { User } from "../interfaces/user.interface";
import Bcrypt from "bcrypt";
import { DatabaseHelper } from "../utils/database-helpers";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import dotenv from "dotenv";
import { generateJWT } from "../utils/generate-jwt";
import { CreateLog } from "../utils/logger";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
dotenv.config({ path: __dirname + "../../.env" });

const _db = new DatabaseHelper();

interface ExtendedRequest extends Request {
  body: {
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
  };
  info?: JWTPayload;
}

export async function RegisterUser(req: ExtendedRequest, res: Response) {
  try {
    const id = uid();
    const { Name, Email, Password } = req.body;
    const { error } = UserSignUpDto.validate(req.body);
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
    const JWT = generateJWT(payload);

    // Send back the user a JWT token as the response.
    return res.status(201).json({ message: "User Registered!", JWT });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Reset User Password
export async function ResetPassword(req: ExtendedRequest, res: Response) {
  try {
    const { Password } = req.body;
    const { id } = req.info as JWTPayload;
    const { error } = UserPasswordResetDto.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    const passwordHash = await Bcrypt.hash(Password, 10);
    await _db.exec("ResetPassword", { id, password: passwordHash });
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
      const { password, ...rest } = item;
      return rest;
    });
    return res.status(200).json({ message: "User found!", payload });
  } catch (error) {
    res.status(500).json(error);
  }
}

// Use the above as guide,
// wrap everything in try catch blocks and return the appropriate status codes and messages.
// Also, use the DTOs to validate the request body.
// NB: the Id is auto generated by the database, so you don't need to pass it in the request body.
// comment out the code where necessary/applicable.

/**
 * @desc    Auth user & generate JWT token
 * @route   POST /api/users/signin
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = UserSignInDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  try {
    const user = await _db.exec("usp_FindUserByEmail", { email });

    if (user.recordset.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await Bcrypt.compare(password, user.recordset[0].password);

    if (isMatch) {
      const { id, name, email, isAdmin } = user.recordset[0];

      const JWT = generateJWT({
        id,
        name,
        email,
        isAdmin,
      });

      return res.status(200).json({ id, name, email, isAdmin, JWT });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/signup
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const { error } = UserSignUpDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  try {
    const user = await _db.exec("usp_FindUserByEmail", { email });

    if (user.recordset.length > 0) {
      return res.status(400).json({
        message:
          "User with similar email already exists, please try another email",
      });
    }

    const passwordHash = await Bcrypt.hash(password, 10);

    const newUser = await _db.exec("usp_RegisterUser", {
      name,
      email,
      password: passwordHash,
    });

    if (newUser.recordset.length > 0) {
      const { id, name, email, isAdmin } = newUser.recordset[0];

      const JWT = generateJWT({
        id,
        name,
        email,
        isAdmin,
      });

      return res.status(201).json({ id, name, email, isAdmin, JWT });
    } else {
      return res.status(400).json({ message: "User registration failed" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id as string;

  try {
    const user = await _db.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const { id, name, email, isAdmin } = user.recordset[0];

      return res.status(200).json({ id, name, email, isAdmin });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (
  req: RequestWithUser,
  res: Response
) => {
  const userId = req.user?.id as string;

  const { name, email, password } = req.body;

  const { error } = UserUpdateProfileDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  try {
    // If user tries to update email that already exists in the database
    // i.e another user exists with the same email that's not the current user
    const otherUser = await _db.exec("usp_FindUserByEmail", { email });

    // check if otherUser is not the current user
    if (otherUser.recordset.length > 0) {
      if (otherUser.recordset[0].id !== userId) {
        return res.status(400).json({
          message:
            "Another user with a similar email already exists, please try another email",
        });
      }
    }

    const user = await _db.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const passwordHash = await Bcrypt.hash(password, 10);

      const updatedUser = await _db.exec("usp_UpdateUser", {
        id: userId,
        name,
        email,
        password: passwordHash,
      });

      if (updatedUser.recordset.length > 0) {
        const { id, name, email, isAdmin } = updatedUser.recordset[0];

        return res.status(200).json({ id, name, email, isAdmin });
      } else {
        return res.status(400).json({ message: "User profile update failed" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private - Admin only
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await _db.exec("usp_GetAllUsers");

    // returns the users else if ther's none yet an empty array is returned
    return res.status(200).json(users.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

// /**
//  * @desc    Delete user
//  * @route   DELETE /api/users/:id
//  * @access  Private/Admin
//  */
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     await user.remove();
//     res.json({ message: "User removed" });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// /**
//  * @desc    Get user by ID
//  * @route   GET /api/users/:id
//  * @access  Private/Admin
//  */
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// /**
//  * @desc    Update user
//  * @route   PUT /api/users/:id
//  * @access  Private/Admin
//  */
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });
