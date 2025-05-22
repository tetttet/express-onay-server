const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

router.post("/", progressController.createProgress);
router.get("/", progressController.getAllProgress);
router.get("/user/:user_id", progressController.getProgressByUser);
router.get("/lesson/:lesson/users", progressController.getUsersByLesson);
router.patch("/:id/status", progressController.updateProgressStatus);
router.delete("/:id", progressController.deleteProgress);

module.exports = router;
