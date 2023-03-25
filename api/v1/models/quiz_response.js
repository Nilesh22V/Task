"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL);

const QuizResponse = sequelize.define(
  "QuizResponse",
  {
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "quiz_responses",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { QuizResponse };
