import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, setting = {}) =>
  Contact.find(filter, "-createdAt -updateAt", setting).populate(
    "owner",
    "email"
  );

export const getContactById = (filter) => Contact.findOne(filter);

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
  });

// ----------------------- функції для роботи з файлом .json

// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const contactsPath = path.resolve("db", "contacts.json");

// export async function listContacts() {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// }

// export async function getContactById(contactId) {
//   const allContacts = await listContacts();
//   const contactById = allContacts.find((item) => item.id === contactId);
//   return contactById || null;
// }

// export async function removeContact(contactId) {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [deleteContact] = allContacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//   return deleteContact;
// }

// export async function addContact(name, email, phone) {
//   const allContacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   allContacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//   return newContact;
// }

// export async function updateContact(contactId, data) {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   allContacts[index] = { ...allContacts[index], ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

//   return allContacts[index];
// }
