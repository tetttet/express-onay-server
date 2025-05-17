const pool = require("../config/db");

class Course {
  static async create(courseData) {
    const {
      tutor_id,
      title,
      description,
      students,
      image_url,
      language,
      price,
      category,
    } = courseData;

    const query = `
      INSERT INTO courses (
        tutor_id, title, description, students,
        image_url, language, price, category
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      tutor_id,
      title,
      description,
      JSON.stringify(students),
      image_url,
      language,
      price,
      JSON.stringify(category),
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async addStudents(courseId, newStudents) {
    const queryGet = `SELECT students FROM courses WHERE id = $1;`;
    const { rows } = await pool.query(queryGet, [courseId]);

    if (rows.length === 0) {
      throw new Error("Course not found");
    }

    const currentStudents = rows[0].students || [];
    const newStudentsArray = Array.isArray(newStudents)
      ? newStudents
      : [newStudents];

    const updatedStudents = [
      ...currentStudents,
      ...newStudentsArray.filter(
        (newStudent) =>
          !currentStudents.some(
            (existingStudent) => existingStudent.id === newStudent
          )
      ),
    ];

    const queryUpdate = `
      UPDATE courses
      SET students = $1
      WHERE id = $2
      RETURNING *;
    `;

    const { rows: updatedRows } = await pool.query(queryUpdate, [
      JSON.stringify(updatedStudents),
      courseId,
    ]);

    return updatedRows[0];
  }

  static async getAll() {
    const { rows } = await pool.query(
      "SELECT * FROM courses ORDER BY created_at DESC"
    );
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query("SELECT * FROM courses WHERE id = $1", [
      id,
    ]);
    return rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    const setQuery = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE courses
      SET ${setQuery}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${fields.length + 1}
      RETURNING *;
    `;

    values.push(id);

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  }

  //remove students from a course
  static async remove(courseId, studentsToRemove) {
    const queryGet = `SELECT students FROM courses WHERE id = $1;`;
    const { rows } = await pool.query(queryGet, [courseId]);

    if (rows.length === 0) {
      throw new Error("Course not found");
    }

    const currentStudents = rows[0].students || [];
    const studentsToRemoveArray = Array.isArray(studentsToRemove)
      ? studentsToRemove
      : [studentsToRemove];

    const updatedStudents = currentStudents.filter(
      (student) => !studentsToRemoveArray.includes(student)
    );

    const queryUpdate = `
      UPDATE courses
      SET students = $1
      WHERE id = $2
      RETURNING *;
    `;

    const { rows: updatedRows } = await pool.query(queryUpdate, [
      JSON.stringify(updatedStudents),
      courseId,
    ]);

    return updatedRows[0];
  }

  //find courses of a tutor
  static async findByTutor(tutorId) {
    const { rows } = await pool.query(
      "SELECT * FROM courses WHERE tutor_id = $1",
      [tutorId]
    );
    return rows;
  }
}

module.exports = Course;
