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

// Configuración de Express
const app = express();

// Módulos de rutas
//const .... = require("....");


// Configuración de rutas
//app.use("/", ....);


// Ejecución del servidor de Express con puerto para Heroku
app.listen(process.env.PORT || 3000,function(){
    console.log('Servidor corriendo en el puerto 3000')
});

// Error 404
//app.use(notFound);