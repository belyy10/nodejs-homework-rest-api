const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares/index");
const { newContactSchema } = require("../../schemas/contacts");
const {
  changeContact,
  createContact,
  deleteContact,
  getContact,
  getContacts,
} = require("../../contollers/contacts.controller.js");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", validateBody(newContactSchema), createContact);

router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateBody(newContactSchema), changeContact);

module.exports = router;
