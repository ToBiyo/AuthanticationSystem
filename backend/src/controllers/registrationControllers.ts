import { Request, Response } from "express";
import {
  findUserByMail,
  addUser,
  confirmUser,
  getUserById,
} from "../db/userQueries";
import { emailConfirmation } from "../services/emailConfirmation";
import { createEmailToken } from "../lib/createEmailToken";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/interfaces";

export const registration = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).send({ error: "All field are required" });
      return;
    }
    const fullName = firstName + lastName;

    const checkMail = await findUserByMail(email);

    if (checkMail) {
      res.status(200).send({ error: "Mail already registered" });
      return;
    }

    const newUser = await addUser(firstName, lastName, email, password);
    const emailToken = createEmailToken(fullName, newUser.id);
    const sendMail = await emailConfirmation(fullName, email, emailToken);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error: error });
  }
};
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.EMAIL_SECRET as string
    ) as JwtPayload;

    const response = await confirmUser(decoded.id);

    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const confirmationLinkRequest = async (req: Request, res: Response) => {
  try {
    const { token, name } = req.body;

    if (!token) {
      res.status(404).send({ message: "Invalid token" });
      return;
    }

    const decoded = jwt.verify(token, process.env.EMAIL_SECRET as string, {
      ignoreExpiration: true,
    }) as JwtPayload;

    const user = await getUserById(decoded.id);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const emailToken = createEmailToken(name, user.id);
    const sendMail = await emailConfirmation(name, user.email, emailToken);

    res.status(200).send({ message: "New link sent" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
