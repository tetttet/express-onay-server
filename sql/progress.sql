CREATE TABLE
    progress (
        id SERIAL PRIMARY KEY, -- уникальный ID записи
        user_id INT NOT NULL, -- пользователь
        course_id INT NOT NULL, -- курс
        lesson VARCHAR(100) NOT NULL, -- урок, теперь строка
        status VARCHAR(20) NOT NULL, -- статус (например 'completed')
        completed_at TIMESTAMP, -- время прохождения урока
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id),
        CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses (id)
    );