//En construccion se utiliza modelo de weglamp
// Módulos
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
//const notFound = require ("./middlewares/notFound");
const session = require ("express-session");
const createError = require('http-errors');
//const config = require("./config/config")
require("dotenv").config();
const models = require("./database/models/index");
const autentificacion = require("./middlewares/autentificacion");



// Configuración de Express
const app = express();

// Módulos de rutas
//const .... = require("....");


// Configuración de rutas
//app.use("/", ....);

// Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keijrkut",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use(autentificacion);

app.use(methodOverride("_method"));

const staticFolder = path.resolve(__dirname, "./public");

app.use(express.static(staticFolder));



// Ejecución del servidor de Express con puerto para Heroku
app.listen(process.env.PORT || 3000,function(){
    console.log('Servidor corriendo en el puerto 3000')
});

// Error 404
//app.use(notFound);

//Route
const rutaIndex = require("./routes/rutaIndex");
const rutaUsuarios = require("./routes/rutaUsuarios");
const rutaPeliculas = require("./routes/rutaPeliculas");

app.use("/", rutaIndex);
app.use("/users", rutaUsuarios);
app.use("/movies", rutaPeliculas);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
