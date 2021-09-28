const express = require("express");
const router = express.Router();

//Controlador

const movieController = require("../controllers/moviesController");

// Middelware
const validations = require("../middlewares/ValidateCreateAndEdit");
const admin = require("../middlewares/admRoute");

// GET 

router.get("/detailMovies/:id", movieController.detail);


//Borrar

router.get("/deleteMovies/:id", admin, movieController.delete);

router.delete("/deleteMovies/:id", admin, movieController.destroy);

//Editar

router.get("/editMovies/:id", admin, movieController.update);

router.put("/editMovies/:id", [admin, validations], movieController.edit);
//Crear

router.get("/createMovies", admin, movieController.add);

router.post("/createMovies", [admin, validations], movieController.create);



module.exports = router;
