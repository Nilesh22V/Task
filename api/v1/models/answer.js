"use strict";

const { Sequelize, DataTypes } = require('sequelize');
const { Question } = require("./question");
const sequelize = new Sequelize(process.env.DB_URL);

const Answer = sequelize.define('Answer', {
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.BOOLEAN,
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
  tableName: "answers",
  timestamps: true,
  underscored: true,
});



module.exports = { Answer };