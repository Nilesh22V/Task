"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const { Answer } = require("./answer");
const sequelize = new Sequelize(process.env.DB_URL);

const Question = sequelize.define(
  "Question",
  {
    question: {
      type: DataTypes.STRING,
    },
    mandatory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    quiz_id: {
      type: DataTypes.INTEGER,
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
    tableName: "questions",
    timestamps: true,
    underscored: true,
  }
);
Question.hasMany(Answer, { foreignKey: 'question_id' });
// Answer.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = { Question };
