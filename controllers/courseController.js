const Course = require("../models/courseModel");

const CourseController = {
  // Создание курса
  async create(req, res) {
    try {
      const course = await Course.create(req.body);
      res.status(201).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create course" });
    }
  },

  // Добавление студентов в курс
  async addStudents(req, res) {
    try {
      const { id } = req.params;
      const { students } = req.body;

      // Проверяем, что данные о студентах либо массив, либо одиночный ID
      if (!Array.isArray(students) && typeof students !== "number") {
        return res
          .status(400)
          .json({ error: "Students must be an array or a single student ID" });
      }

      // Добавляем студентов
      const updatedCourse = await Course.addStudents(id, students);

      // Возвращаем обновленный курс
      res.json(updatedCourse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add students" });
    }
  },

  // Получение всех курсов
  async getAll(req, res) {
    try {
      const courses = await Course.getAll();
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  },

  // Получение одного курса по ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.getById(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch course" });
    }
  },

  // Обновление курса
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await Course.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update course" });
    }
  },

  // Удаление курса
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Course.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json({ message: "Course deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete course" });
    }
  },

  // Удаление студентов из курса
  async removeStudents(req, res) {
    try {
      const { courseId } = req.params;
      const { students } = req.body;

      if (!students || (Array.isArray(students) && students.length === 0)) {
        return res
          .status(400)
          .json({ message: "No students provided for removal" });
      }

      const updatedCourse = await Course.remove(courseId, students);
      res.status(200).json({
        message: "Students removed successfully",
        course: updatedCourse,
      });
    } catch (error) {
      console.error("Error removing students:", error.message);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },

  // find courses of a tutor
  async findCoursesByTutor(req, res) {
    try {
      const { tutorId } = req.params;
      const courses = await Course.findByTutor(tutorId);
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  },
};

module.exports = CourseController;
