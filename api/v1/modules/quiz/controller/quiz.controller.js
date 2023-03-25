const BaseController = require("../../../../../base/base.controller");
const responseService = require("../../../../../utils/common/response.service");
const quizRepository = require("../repository/quiz.repository");

class QuizController extends BaseController {
  constructor(respService, repository, dto) {
    super(respService, repository, dto);
    this.repository = repository;
    this.createQuiz = this.createQuiz.bind(this);
    this.retrieveQuize = this.retrieveQuize.bind(this);
    this.createQuizResponse = this.createQuizResponse.bind(this)
  }


  async createQuiz(req, res) {
    try {
      const newQuiz = await this.repository.createQuiz(req.body);
      this.responseService.success(req, res, newQuiz);
    } catch (e) {
      this.responseService.fail(req, res, e);
    }
  }

  async retrieveQuize(req, res) {
    try {
      const newQuiz = await this.repository.retrieveQuize(req.params.quiz_id);
      this.responseService.success(req, res, newQuiz);
    } catch (e) {
      this.responseService.fail(req, res, e);
    }
  }

  async createQuizResponse(req, res) {
    try {
      const save = await this.repository.createQuizResponse(req.body);
      this.responseService.success(req, res, save);
    } catch (e) {
      this.responseService.fail(req, res, e);
    }
  }
}

module.exports = new QuizController(responseService ,quizRepository);
