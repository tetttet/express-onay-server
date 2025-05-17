const {
  getAllUsers,
  createUser,
  getUserByParamId,
  getUserByParamEmail,
  deleteUser,
  updateUser,
  updateUserImageUrl,
  createAdmin,
  createTutor,
  updateUsername,
  updatePassword,
  updateCity,
  updatePhoneNumber,
  updateAge,
} = require("../models/userModel");
const cloudinary = require("../lib/cloudinary");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при получении пользователей" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByParamId(id);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при получении пользователя" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByParamEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при получении пользователя" });
  }
};

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании пользователя" });
  }
};

const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newAdmin = await createAdmin(name, email, password);
    res.status(201).json(newAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании администратора" });
  }
};

const addTutor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newTutor = await createTutor(name, email, password);
    res.status(201).json(newTutor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании преподавателя" });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при удалении пользователя" });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, phone_number, city, age, password } = req.body;
  try {
    const updatedUser = await updateUser(
      id,
      username,
      email,
      phone_number,
      city,
      age,
      password
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обновлении пользователя" });
  }
};

const updateUserImage = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  try {
    const updatedUser = await updateUserImageUrl(id, image);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обновлении имени пользователя" });
  }
};

const updateUserUsername = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const updatedUser = await updateUsername(id, username);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обновлении имени пользователя" });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const updatedUser = await updatePassword(id, password);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Ошибка при обновлении пароля пользователя" });
  }
};

const updateUserCity = async (req, res) => {
  const { id } = req.params; // Получаем id из параметров маршрута
  const { city } = req.body; // Получаем новый город из тела запроса

  try {
    const updatedUser = await updateCity(id, city); // Вызываем функцию обновления

    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Ошибка при обновлении города пользователя" });
  }
};

const updateUserPhoneNumber = async (req, res) => {
  const { id } = req.params;
  const { phone_number } = req.body;
  try {
    const updatedUser = await updatePhoneNumber(id, phone_number);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Ошибка при обновлении номера телефона пользователя" });
  }
};

const updateUserAge = async (req, res) => {
  const { id } = req.params;
  const { age } = req.body;
  try {
    const updatedUser = await updateAge(id, age);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Ошибка при обновлении возраста пользователя" });
  }
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUserById,
  updateUserImage,
  addAdmin,
  addTutor,
  updateUserUsername,
  updateUserPassword,
  updateUserCity,
  updateUserPhoneNumber,
  updateUserAge,
};
