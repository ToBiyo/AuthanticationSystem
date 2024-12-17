import jwt from "jsonwebtoken";

export const createAuthToken = (id: string) => {
  const token = jwt.sign({ id: id }, process.env.AUTH_SECRET as string, {
    algorithm: "HS256",
    expiresIn: "2m",
  });

  return token;
};
