const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT id, name, username, email, role, image_url, city, age, phone_number FROM users"
  );
  return result.rows;
};

const getUserByParamId = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const randomSuffix = Math.floor(Math.random() * 10000);
  const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomSuffix}`;

  const result = await pool.query(
    `INSERT INTO users (name, email, password, username) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, username, role`,
    [name, email, hashedPassword, username]
  );

  return result.rows[0];
};

const createAdmin = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const randomSuffix = Math.floor(Math.random() * 10000);
  const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomSuffix}`;

  const result = await pool.query(
    `INSERT INTO users (name, email, password, username, role) 
       VALUES ($1, $2, $3, $4, 'admin') 
       RETURNING id, name, email, username`,
    [name, email, hashedPassword, username]
  );

  return result.rows[0];
};

const createTutor = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const randomSuffix = Math.floor(Math.random() * 10000);
  const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomSuffix}`;

  const result = await pool.query(
    `INSERT INTO users (name, email, password, username, role) 
       VALUES ($1, $2, $3, $4, 'tutor') 
       RETURNING id, name, email, username`,
    [name, email, hashedPassword, username]
  );

  return result.rows[0];
};

const getUserByParamEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
};

const updateUser = async (
  id,
  username,
  email,
  phone_number,
  city,
  age,
  password
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `UPDATE users 
       SET username = $1, email = $2, phone_number = $3, city = $4, age = $5, password = $6
       WHERE id = $7 
       RETURNING id, username, email, phone_number, city, age`,
    [username, email, phone_number, city, age, hashedPassword, id]
  );

  return result.rows[0];
};

const updateUserImageUrl = async (id, imageUrl) => {
  const result = await pool.query(
    `UPDATE users 
       SET image_url = $1
       WHERE id = $2 
       RETURNING id, image_url`,
    [imageUrl, id]
  );

  return result.rows[0];
};

//update only username
const updateUsername = async (id, username) => {
  const result = await pool.query(
    `UPDATE users 
       SET username = $1
       WHERE id = $2 
       RETURNING id, username`,
    [username, id]
  );

  return result.rows[0];
};

//update only password
const updatePassword = async (id, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `UPDATE users 
       SET password = $1
       WHERE id = $2 
       RETURNING id, password`,
    [hashedPassword, id]
  );

  return result.rows[0];
};

//update only city
const updateCity = async (id, city) => {
  const result = await pool.query(
    `UPDATE users 
       SET city = $1
       WHERE id = $2 
       RETURNING id, city`,
    [city, id]
  );

  return result.rows[0];
};

//update only phone_number
const updatePhoneNumber = async (id, phone_number) => {
  const result = await pool.query(
    `UPDATE users 
       SET phone_number = $1
       WHERE id = $2 
       RETURNING id, phone_number`,
    [phone_number, id]
  );

  return result.rows[0];
};

//update only age
const updateAge = async (id, age) => {
  const result = await pool.query(
    `UPDATE users 
       SET age = $1
       WHERE id = $2 
       RETURNING id, age`,
    [age, id]
  );

  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByParamEmail,
  deleteUser,
  updateUser,
  getUserByParamId,
  updateUserImageUrl,
  createAdmin,
  createTutor,
  updateUsername,
  updatePassword,
  updateCity,
  updatePhoneNumber,
  updateAge,
};
