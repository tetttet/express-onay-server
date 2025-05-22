CREATE TABLE
    courses (
        id SERIAL PRIMARY KEY,
        tutor_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        students JSONB DEFAULT '[]',
        image_url TEXT,
        language TEXT,
        price NUMERIC(10, 2),
        category JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );