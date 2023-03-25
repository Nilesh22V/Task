const express = require("express");
const router = express.Router();
const quizRoutes = require("./modules/quiz/routes/quiz.route");


router.use("/quiz", quizRoutes);


module.exports = router;
