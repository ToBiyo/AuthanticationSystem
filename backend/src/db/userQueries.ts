import { eq } from "drizzle-orm";
import { usersTable } from "./schema";
import { db } from "./db";
import bcrypt from "bcrypt";

export async function addUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const hashedpassword = await bcrypt.hash(password, 10);

  const user: typeof usersTable.$inferInsert = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedpassword,
  };

  const [newUser] = await db.insert(usersTable).values(user).returning();
  return newUser;
}

//not working
export async function findUserByMail(email: string) {
  const data = await db
    .selectDistinct()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  const user = data[0];

  return user;
}

export async function getUserById(id: string) {
  const data = await db
    .selectDistinct()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return data[0];
}

export async function updatePassword(password: string, id: string) {
  const hashedpassword = await bcrypt.hash(password, 10);

  const data = await db
    .update(usersTable)
    .set({ password: hashedpassword })
    .where(eq(usersTable.id, id));

  return { message: "password updated" };
}

export async function updateUser(
  firstName: string,
  lastName: string,
  email: string,
  id: string
) {
  const data = await db
    .update(usersTable)
    .set({ firstName: firstName, lastName: lastName, email: email })
    .where(eq(usersTable.id, id));
}

export async function confirmUser(id: string) {
  const data = await db
    .update(usersTable)
    .set({ isVerified: true })
    .where(eq(usersTable.id, id));
}

export async function deleteUser(id: string) {
  const data = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning();
}
