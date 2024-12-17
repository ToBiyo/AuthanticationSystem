import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/interfaces";
import { VerifyTokenResult } from "../interfaces/interfaces";

export const verifyToken = (token: string): VerifyTokenResult => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.AUTH_SECRET as string
    ) as JwtPayload;
    return { decoded }; //
  } catch (error) {
    return { error: (error as Error).message }; //
  }
};
