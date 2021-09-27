const express = require("express");
const router = express.Router();

// Requerimiento de controladores

const controladorPelicula = require("../controllers/controladorPelicula");

// llamos a los Middelware

const validations = require("../middlewares/crearEditar");
const admin = require("../middlewares/permisoAdministrador");


//GET detalle de la pelicual

router.get("/detailMovies/:id", controladorPelicula.detail);

//crear la pelicula en formulario

router.get("/crearPelicula", admin, controladorPelicula.add);

router.post("/crearPelicula", [admin, validations], controladorPelicula.create);

//Editar la pelicula en el formulario

router.get("/editarPelicula/:id", admin, controladorPelicula.update);

router.put("/editarPelicula/:id", [admin, validations], controladorPelicula.edit);

//Borrar pelicula

router.get("/borrarPelicula/:id", admin, controladorPelicula.delete);

router.delete("/borrarPelicula/:id", admin, controladorPelicula.destroy);

module.exports = router;
