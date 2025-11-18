import jwt from "jsonwebtoken";
import { userNameExist } from "./authdb.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer")) {
    return res.status(401).json({ Error: "Unauthorized" });
  }

  const token = authHeader.substring(7);

  try {
    const decodedToken = jwt.verify(token, "secret_key");

    if (!userNameExist(decodedToken.username)) {
      return res.status(401).json({ Error: "Unauthorized" });
    }

    req.user = decodedToken.username;
    next();
  } catch (error) {
    return res.status(401).json({ Error: "Unauthorized" });
  }
};
