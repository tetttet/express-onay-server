-- Таблица для хранения информации о пользователях
CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    image_url TEXT,
    city VARCHAR(100),
    age INT,
    phone_number VARCHAR(20)
  );