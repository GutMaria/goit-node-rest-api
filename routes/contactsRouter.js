import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import isValidId from "../middlwares/isValidId.js";
import autenticate from "../middlwares/authenticate.js";

const contactsRouter = express.Router();
// використовуємо мідлвару для перевірки валідності токену
contactsRouter.use(autenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", isValidId, updateContact);
contactsRouter.patch("/:id/favorite", isValidId, updateContact);

export default contactsRouter;
