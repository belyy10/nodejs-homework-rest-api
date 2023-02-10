const { User } = require("../../service/schemas/users");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;
  user.contacts.push(contactId);
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  });
  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate("contacts", {
    email: 1,
    name: 1,
    _id: 1,
  });
  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}
async function current(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;
  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}

module.exports = { createContact, getContacts, current };
