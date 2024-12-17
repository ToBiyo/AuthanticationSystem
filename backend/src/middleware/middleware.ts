import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/verifyToken";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["token"];

  if (!token) {
    res.status(404).json({ message: "Access denied. Missing Token" });
    return;
  }

  const decoded = verifyToken(token);

  if (decoded.error) {
    if (decoded.error === "jwt expired") {
      res.status(401).send({ message: decoded.error });
      return;
    }

    res.status(402).send({ message: "Invalid Token" });
    return;
  }

  req.body.user_id = decoded.decoded?.id;
  next();
};

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body;

  req.body.user = user;

  next();
};
