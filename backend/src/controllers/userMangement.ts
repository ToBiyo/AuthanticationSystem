import { Request, Response } from "express";
import {
  getUserById,
  updatePassword,
  updateUser,
  deleteUser,
} from "../db/userQueries";
import bcrypt from "bcrypt";

//CHANGE USER PASSWORD

export const changePassword = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const { oldPassword } = req.body;
  const { newPassword } = req.body;
  const user = await getUserById(user_id);

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  const isValidPassword = await bcrypt.compare(oldPassword, user.password);

  if (!isValidPassword) {
    res.status(401).send({ message: "Invalid Password" });
    return;
  }

  const response = await updatePassword(newPassword, user.id);

  res.status(200).json({ user: user, password: oldPassword });
};

//GET USER DATA

export const getUserData = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const user = await getUserById(user_id);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const profileData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).send({ user: profileData });
  } catch (error) {
    res.status(401).send({ message: error });
  }
};

//UOPDATE USER PERSONAL DATA
export const updateUserData = async (req: Request, res: Response) => {
  const { first_name, last_name, email, user_id } = req.body;

  if (!first_name || !last_name || !email) {
    res.status(401).send({ message: "All field are required" });
    return;
  }

  const response = await updateUser(first_name, last_name, email, user_id);

  res.status(200).send({ message: "successfully update user data" });
};

//DELETE ACCOUNT

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const { password } = req.body;

    console.log(user_id, password);

    const user = await getUserById(user_id);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(402).send({ message: "Incorrect password" });
      return;
    }

    const response = await deleteUser(user_id);

    res.status(200).send({ response: response, message: "Account deleted" });
  } catch (error) {
    res.status(400).send({
      error: error,
      message: "Something went wrong, your account was not deleted",
    });
  }
};
