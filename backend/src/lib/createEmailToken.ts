import jwt from "jsonwebtoken";

export const createEmailToken = (name: string, id: string) => {
  const token = jwt.sign(
    { name: name, id: id },
    process.env.EMAIL_SECRET as string,
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  return token;
};
