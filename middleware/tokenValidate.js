import { validateToken } from "../services/token.services.js";

export async function tokenValidate(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Falta token");

    const userData = await validateToken(token);

    req.user = userData;  // 👈 GUARDAMOS EL USUARIO

    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}
