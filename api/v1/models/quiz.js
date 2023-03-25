"use strict";

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);
const { Question } = require("./question");
const Quiz = sequelize.define('Quiz', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
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
  tableName: "quizzes",
  timestamps: true,
  underscored: true,
});
Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
// Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

module.exports = { Quiz };