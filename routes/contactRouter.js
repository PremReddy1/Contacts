const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact_id,
  createContacts,
  updateContact_id,
  deleteContact_id,
} = require("../controllers/contactControler");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.get("/contacts", validateToken, getContacts);
router.get("/contacts/:id", getContact_id);
router.post("/contacts", createContacts);
router.put("/contacts/:id", updateContact_id);
router.delete("/contacts/:id", deleteContact_id);

module.exports = router;
