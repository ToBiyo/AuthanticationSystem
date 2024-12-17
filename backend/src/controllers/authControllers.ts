import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { findUserByMail, getUserById, deleteUser } from "../db/userQueries";
import { createAuthToken } from "../lib/creteAuthToken";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/interfaces";

//REGISTRATION CONTROLLER

//LOGIN CONTROLLER
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "All field are required" });
      return;
    }

    const user = await findUserByMail(email);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }

    if (!user.isVerified) {
      res.status(401).send({
        message: "Please chek your eamil and confirm your registration",
      });
      return;
    }

    //sending back jwt token for authentication
    const token = createAuthToken(user.id);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: false,
        sameSite: "strict",
      })
      .send({ message: "Successfully loged in" });
  } catch (error) {
    res.send({ error: error });
  }
};

//LOGOUT CONTROLLER
export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).send({ message: "success" });
};

export const greetings = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    console.log(user_id);

    const user = await getUserById(user_id);

    if (!user) {
      res.status(404).send({ message: "user not found" });
      return;
    }
    const { firstName } = user;
    res.status(200).json({ user: firstName });
  } catch (error) {
    res.send(404).send("user not found");
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies["token"];
  console.log(token);

  try {
    const { id } = jwt.verify(token, process.env.AUTH_SECRET as string, {
      ignoreExpiration: true,
    }) as JwtPayload;

    const newToken = createAuthToken(id);

    res
      .cookie("token", newToken, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        secure: false,
        sameSite: "strict",
      })
      .send({ message: "Token succesfully refreshed" });
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};
