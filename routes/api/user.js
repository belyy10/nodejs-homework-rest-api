const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/index");

const {
  createContact,
  getContacts,
  current,
} = require("../../controllers/user/user");

router.get("/contacts", auth, getContacts);

router.post("/contacts", auth, createContact);
router.get("/current", auth, current);
module.exports = router;
