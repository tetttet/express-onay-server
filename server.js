require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

//
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
