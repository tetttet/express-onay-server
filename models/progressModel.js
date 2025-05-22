const pool = require("../config/db");

const ProgressModel = {
  // Создать новую запись прогресса
  async create({ user_id, course_id, lesson, status, completed_at = null }) {
    const query = `
      INSERT INTO progress (user_id, course_id, lesson, status, completed_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [user_id, course_id, lesson, status, completed_at];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Получить прогресс по user_id и course_id
  async findByUserAndCourse(user_id, course_id) {
    const query = `
      SELECT * FROM progress
      WHERE user_id = $1 AND course_id = $2;
    `;
    const { rows } = await pool.query(query, [user_id, course_id]);
    return rows;
  },

  // Обновить статус урока и completed_at по id записи
  async updateStatus(id, status, completed_at = null) {
    const query = `
      UPDATE progress
      SET status = $1, completed_at = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;
    const values = [status, completed_at, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Получить все уроки (прогресс) для определённого пользователя
  async findAllByUser(user_id) {
    const query = `
      SELECT * FROM progress
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const { rows } = await pool.query(query, [user_id]);
    return rows;
  },

  // Получить всех пользователей, которые проходили конкретный урок (lesson)
  async findAllUsersByLesson(lesson) {
    const query = `
      SELECT DISTINCT user_id FROM progress
      WHERE lesson = $1;
    `;
    const { rows } = await pool.query(query, [lesson]);
    return rows.map((r) => r.user_id);
  },

  async findAll() {
    const query = `
      SELECT * FROM progress
      ORDER BY created_at DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  // Получить прогресс всех пользователей для конкретного урока
  async findAllByLesson(lesson) {
    const query = `
      SELECT * FROM progress
      WHERE lesson = $1;
    `;
    const { rows } = await pool.query(query, [lesson]);
    return rows;
  },

  // Получить прогресс по user_id (все уроки, все курсы)
  async findAllByUserId(user_id) {
    const query = `
      SELECT * FROM progress
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const { rows } = await pool.query(query, [user_id]);
    return rows;
  },

  // Можно добавить метод для удаления записи по id
  async deleteById(id) {
    const query = `
      DELETE FROM progress WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

module.exports = ProgressModel;
