import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { createToken } from "./token.services.js";

const client = new MongoClient(
  "mongodb+srv://admin:admin@hibridas.qaozghl.mongodb.net/"
);
const db = client.db("AH20232CP1");

export async function createUserApp(userApp) {
  await client.connect();

  const exist = await db.collection("userApps").findOne({ email: userApp.email });
  if (exist) throw new Error("Email existente");

  const hashed = await bcrypt.hash(userApp.password, 10);

  const newUser = {
    username: userApp.username,
    email: userApp.email,
    password: hashed,
  };

  await db.collection("userApps").insertOne(newUser);

  return { ...newUser, password: undefined };
}

export async function login(userApp) {
  await client.connect();

  const user = await db.collection("userApps").findOne({ email: userApp.email });
  if (!user) throw new Error("Credenciales inválidas");

  const ok = await bcrypt.compare(userApp.password, user.password);
  if (!ok) throw new Error("Credenciales inválidas");

  const token = await createToken(user);

  return { ...user, token, password: undefined };
}
