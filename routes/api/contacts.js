const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares/index");
const { newContactSchema } = require("../../validation/contacts");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatus,
} = require("../../controllers/contacts/index");

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", validateBody(newContactSchema), createContact);

router.delete("/:id", deleteContact);
router.put("/:id", validateBody(newContactSchema), changeContact);
router.patch("/:id/favorite", validateBody(newContactSchema), updateStatus);
module.exports = router;
