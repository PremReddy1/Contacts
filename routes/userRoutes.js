const express = require("express");
const {
  createUser,
  getUsers,
  loginUser,
} = require("../controllers/userControlles");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.get("/", getUsers);

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/current", validateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
