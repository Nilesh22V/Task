const BaseService = require("../../../../../base/base.service");
const { Quiz } = require("../../../models/quiz"); // ,
const { Answer } = require("../../../models/answer");
const { Question } = require("../../../models/question");
const { QuizResponse } = require("../../../models/quiz_response");
const Sequelize = require("sequelize");

class QuizRepository extends BaseService {
  constructor(model) {
    super(model);
    this.model = model;
    this.createQuiz = this.createQuiz.bind(this);
    this.quizCreateOrPublish = this.quizCreateOrPublish.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.createQuizResponse = this.createQuizResponse.bind(this);
  }

  async createQuiz(quizDto) {
    try {
      const quiz = await this.quizCreateOrPublish(quizDto);
      await this.createQuestions(quizDto.questions, quiz.id);
      return quiz;
    } catch (error) {
      throw new Error("Failed to create quiz");
    }
  }

  async quizCreateOrPublish(createDto) {
    try {
      const quiz = await Quiz.create({
        title: createDto.title,
        description: createDto.description,
        type: createDto.type,
      });
      return quiz;
    } catch (error) {
      throw new Error("Failed to create quiz");
    }
  }

  async createQuestions(questions, quizId) {
    try {
      for (const question of questions) {
        const questionData = await Question.create({
          question: question.question,
          mandatory: question.mandatory,
          quiz_id: quizId,
        });
        const hasTrueType = question.answers.some(
          (answer) => answer.type === true
        );
        if (!hasTrueType) {
          throw new Error(
            "There must be one true answer type for each question."
          );
        }
        for (const choice of question.answers) {
          const answerData = await Answer.create({
            answer: choice.answer,
            question_id: questionData.id,
            type: choice.type,
          });
        }
      }
    } catch (error) {
      throw new Error("Failed to create questions");
    }
  }

  async retrieveQuize(quizId) {
    try {
      const quiz = await Quiz.findOne({
        where: { id: quizId, type: "publish" },
        attributes: ["title", "description", "type"],
        include: [
          {
            model: Question,
            attributes: ["question", "mandatory", "quiz_id"],
            include: [
              {
                model: Answer,
                attributes: ["answer", "question_id"],
              },
            ],
          },
        ],
      });
      return quiz;
    } catch (error) {
      throw new Error("Failed to retrieve quiz");
    }
  }

  async createQuizResponse(responseDto) {
    try {
      const quizResponse = await QuizResponse.create({
        quiz_id: responseDto.quizId,
        question_id: responseDto.questionId,
        answer_id: responseDto.answerId,
      });
      return quizResponse;
    } catch (e) {
      throw new Error("Failed to create quiz response");
    }
  }
}

module.exports = new QuizRepository();
