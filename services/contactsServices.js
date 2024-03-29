import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const removeContact = async (id) => await Contact.findByIdAndDelete(id);

export const addContact = (data) => Contact.create(data);

export const updateContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data, {
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
