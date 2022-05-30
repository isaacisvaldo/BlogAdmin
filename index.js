const express = require("express"); // Importando o express
const app = express(); // Iniciando o express
const bodyParser = require("body-parser");
const session = require("express-session")
const connection = require("./database/database");
const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");
const Usercontroller = require("./admin/Usercontroller");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./admin/User");


//Testando a BD
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


app.use(session({
    secret: "wertyuasdfghDeixa-otáriojdfghjsdfwerty",
    cookie: { maxAge: 90000000000000 }
}));

//Arquivos estaticos
app.use(express.static('public'));
//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//View Engine
app.set('view engine', 'ejs');

app.use("/", CategoriesController);//para utilizar as rotas que estão deste controler
app.use("/", ArticlesController);
app.use("/", Usercontroller);
app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories });
        });

    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            });
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        console.log(error);
        res.redirect("/");
    })
    app.get("/category/:slug", (req, res) => {
        var slug = req.params.slug;
        Category.findOne({
            where: {
                slug: slug
            },
            include: [{ model: Article }]
        }).then(category => {
            if (category != undefined) {
                Category.findAll().then(categories => {

                    res.render("index", { articles: category.articles, categories: categories });
                });

            } else {
                res.redirect("/");
            }
        }).catch(err => {
            res.redirect("/");
        });

    });

});
app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um problema ao iniciar o servidor!");
    } else {
        console.log("Servidor iniciado com sucesso!");
    }
})