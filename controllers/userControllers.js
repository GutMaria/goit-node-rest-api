import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import * as usersServices from "../services/usersServices.js";
import { typeSubscription } from "../constants/user-constants.js";
import "dotenv/config.js";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // Додаємо аватар
    const url = gravatar.url(email, { s: "200", r: "x", d: "robohash" });
    const newUser = await usersServices.register({
      ...req.body,
      password: hashPassword,
      avatarURL: url,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersServices.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    // Створюємо токен
    const { _id: id } = user;
    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    await usersServices.updateUser({ _id: id }, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    if (!email) {
      throw HttpError(401, "Not authorized");
    }
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log("req.user", req.user);
    console.log("_id", _id);

    await usersServices.updateUser({ _id }, { token: "" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    if (!typeSubscription.includes(subscription)) {
      throw HttpError(400, "Invalid subscription value");
    }

    const { _id } = req.user;

    await usersServices.updateUser({ _id }, { subscription });
    res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    console.log("req.file", req.file);
    const { path: oldPath, filename } = req.file;
    // робимо обробку
    const image = await Jimp.read(oldPath);
    console.log("JIMP image");
    await image.resize(250, 250).quality(100).write(oldPath);

    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

    const { _id } = req.user;

    await usersServices.updateUser({ _id }, { avatarURL: avatar });
    res.json({ avatarURL: avatar });
  } catch (error) {
    next(error);
  }
};
