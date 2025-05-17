const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByParamEmail, createUser } = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Пожалуйста, заполните все поля" });
  }

  try {
    const existingUser = await getUserByParamEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    const newUser = await createUser(name, email, password);
    res
      .status(201)
      .json({ message: "Пользователь успешно зарегистрирован", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при регистрации пользователя" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Пожалуйста, заполните все поля" });
  }

  try {
    const user = await getUserByParamEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Неверный email или пароль" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Неверный email или пароль" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Успешный вход", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при входе" });
  }
};

module.exports = { registerUser, loginUser };
