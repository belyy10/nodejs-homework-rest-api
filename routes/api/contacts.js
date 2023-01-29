const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares/index");
const { newContactSchema } = require("../../validation/contacts");
const {
  changeContact,
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateStatus,
} = require("../../contollers/contacts.controller.js");

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", validateBody(newContactSchema), createContact);

router.delete("/:id", deleteContact);
router.put("/:id", validateBody(newContactSchema), changeContact);
router.patch("/:id/favorite", validateBody(newContactSchema), updateStatus);
module.exports = router;
