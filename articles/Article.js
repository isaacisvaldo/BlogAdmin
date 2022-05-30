const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
title:{
type: Sequelize.STRING,
allowNull:false

},slug:{
    type: Sequelize.STRING,
    allowNull:false
},body:{
    type:Sequelize.TEXT,
    allowNull:false
}

});
Category.hasMany(Article);//uma categoria tem varios artigos (Representando um relacionamento Muitos para 1)
Article.belongsTo(Category);//um artigo pertence a uma categoria (Representando um relacionamento 1 para 1)

 
module.exports = Article;