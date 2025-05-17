const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController");

router.post("/", CourseController.create);
router.post("/:id/students", CourseController.addStudents);
router.put("/:courseId/remove-students", CourseController.removeStudents);
router.get("/tutor/:tutorId", CourseController.findCoursesByTutor);
router.get("/", CourseController.getAll);
router.get("/:id", CourseController.getById);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.delete);

module.exports = router;
