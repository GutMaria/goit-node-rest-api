import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/usersServices.js";
import "dotenv/config.js";

const { JWT_SECRET } = process.env;

const autenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    //Якщо верифікація пройдена повертається payload
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ _id: id });
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    if (!user.token) {
      return next(HttpError(401, "Token invalid"));
    }
    // Якщо всі перевірки успішні викликаємо next() і передаємо виконання далі
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default autenticate;
