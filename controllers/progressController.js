const Progress = require("../models/progressModel");

// Контроллер для создания прогресса
async function createProgress(req, res) {
  try {
    const { user_id, course_id, lesson, status, completed_at } = req.body;
    if (!user_id || !course_id || !lesson || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const progress = await Progress.create({
      user_id,
      course_id,
      lesson,
      status,
      completed_at: completed_at ? new Date(completed_at) : null,
    });

    res.status(201).json(progress);
  } catch (error) {
    console.error("Error creating progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Контроллер для получения всех уроков пользователя
async function getProgressByUser(req, res) {
  try {
    const user_id = parseInt(req.params.user_id);
    if (isNaN(user_id)) {
      return res.status(400).json({ error: "Invalid user_id" });
    }

    const progress = await Progress.findAllByUser(user_id);
    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress by user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Контроллер для получения всех пользователей, которые проходили урок
async function getUsersByLesson(req, res) {
  try {
    const lesson = req.params.lesson;
    if (!lesson) {
      return res.status(400).json({ error: "Lesson parameter is required" });
    }

    const users = await Progress.findAllUsersByLesson(lesson);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users by lesson:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Контроллер для обновления статуса прогресса
async function updateProgressStatus(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { status, completed_at } = req.body;
    if (isNaN(id) || !status) {
      return res.status(400).json({ error: "Invalid id or missing status" });
    }

    const updated = await Progress.updateStatus(
      id,
      status,
      completed_at ? new Date(completed_at) : null
    );

    if (!updated) {
      return res.status(404).json({ error: "Progress record not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating progress status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Контроллер для удаления записи прогресса
async function deleteProgress(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await Progress.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ error: "Progress record not found" });
    }

    res.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//
async function getAllProgress(req, res) {
  try {
    const progress = await Progress.findAll();
    res.json(progress);
  } catch (error) {
    console.error("Error fetching all progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllProgress,
  createProgress,
  getProgressByUser,
  getUsersByLesson,
  updateProgressStatus,
  deleteProgress,
};
