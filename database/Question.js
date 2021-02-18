const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const connection = require("./database");


const Question = connection.define("question",{
    titulo:{
        type: Sequelize.STRING,//string - textos curtos
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,//texto comprido
        allowNull: false
    }
},{});

Question.sync({force: false}).then(()=>{

});

module.exports = Question;