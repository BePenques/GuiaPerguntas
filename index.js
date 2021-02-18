const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");//importa conexão
const Question = require("./database/Question");//importa model
const Response = require("./database/Response");//importa model

//database
connection
    .authenticate()
    .then(()=>{
        console.log("Autenticacao feita no bd!");
    }).catch((msgErro)=>{
        console.log(msgErro)
    });

app.set('view engine', 'ejs');//dizer p express usar ejs como engine
app.use(express.static('public'));//arquivos estáticos(css,js front,imgs)


//configurar bodyparser
app.use(bodyparser.urlencoded({extended:false}));//traduz os dados do formulario para uma estrutura javascript
app.use(bodyparser.json());

//ROTAS
app.get("/",(req,res)=>{
    Question.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(questions =>{
         //console.log(questions);
         res.render("index",{//passando perguntas pro front
            questions: questions
         });
    });//SELECT * FROM...
  
});

app.get("/to-ask",(req,res)=>{
    res.render("to-ask");
});


app.post("/savequestion",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Question.create({ //INSERT INTO...
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    })
    // res.send("form recebido titulo:"+titulo+"descricao:"+descricao);
});

app.get("/question/:id",(req,res)=>{
    var id = req.params.id;
    Question.findOne({
        where: {id: id}

    }).then(question =>{
        if(question != undefined){

            Response.findAll({
                where: {question_id: question.id},
                order: [['id','DESC']]
            }).then(responses=>{
                res.render("question",{//passando perguntas pro front
                    question: question,
                    responses: responses
                 });
            });

           
        }else{
            res.redirect("/");
        }
    });

});

app.post("/response",(req,res)=>{
    var body = req.body.body;
    var question_id = req.body.question_id;

    Response.create({ //INSERT INTO...
        body: body,
        question_id: question_id
    }).then(()=>{
        res.redirect("/question/"+question_id);
    });
});

app.listen(8080, ()=>{
    console.log("serv rodando");
});