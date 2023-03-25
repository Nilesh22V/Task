const express = require("express");
const quizController = require("../controller/quiz.controller")
const router = express.Router();


router.route("/create").post(quizController.createQuiz);
router.route("/:quiz_id").get(quizController.retrieveQuize);
router.route("/submit").post(quizController.createQuizResponse)

module.exports = router;
