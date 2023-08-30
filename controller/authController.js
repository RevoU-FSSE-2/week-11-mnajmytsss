const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt");

const validRoles = ["user", "admin"];

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (username === [""]) {
      throw new Error("username can not be blank");
    }
    if (!validRoles.includes(role)) {
      throw new Error("invalid role");
    }
    const user = await req.db.collection("User").findOne({ username });
    if (user) {
      throw new Error("username is already exist");
    }

    if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)) {
      throw new Error(
        "Password must be alphanumeric and at least 8 characters long"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await req.db
      .collection("User")
      .insertOne({ username, password: hashedPassword, role });
    res.status(200).json({
      message: "User successfully registered",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await req.db.collection("User").findOne({ username });

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { username: user.username, id: user._id, role: user.role },
        JWT_SIGN
      );
      res.status(200).json({
        message: "user successfully logged id",
        data: token,
      });
    } else {
      res.status(400).json({ error: "password is incorrect" });
    }
  } else {
    res.status(400).json({ error: "user not found" });
  }
};

module.exports = {
  register,
  login,
};
