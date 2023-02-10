const express = require("express");
const router = express.Router();
const { validateBody, upload } = require("../../middlewares/index");
const { newContactSchema } = require("../../validation/contacts");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatus,
  uploadAvatar,
} = require("../../controllers/contacts/index");
const { tryCatchWrapper } = require("../../utils/httpError/contacts");

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", validateBody(newContactSchema), createContact);

router.delete("/:id", deleteContact);
router.put("/:id", validateBody(newContactSchema), changeContact);
router.patch("/:id/favorite", validateBody(newContactSchema), updateStatus);
router.patch(
  "/:id/avatar",
  upload.single("avatar"),
  tryCatchWrapper(uploadAvatar)
);
module.exports = router;
