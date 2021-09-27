const { body } = require("express-validator");

module.exports = [
  body("title").notEmpty().withMessage("El título no puede estar vacio"),
  
  body("rating").notEmpty().withMessage("Faltó ponerle ratinga a la película"),

  body("awards").notEmpty().withMessage("Le falta agregar la cantidad de premios ganados por la película"),
  
  body("release_date").notEmpty().withMessage("Tiene que poner la fecha en que la película se estrenó"),
  
  body("length").notEmpty().withMessage("Tiene que poner el tiempo de duración de la película"),
];

//El género no hace falta porque como es por opción nunca va a estar vacio