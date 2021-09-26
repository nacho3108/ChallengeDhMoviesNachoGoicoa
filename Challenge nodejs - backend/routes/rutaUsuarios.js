const express = require("express");
const router = express.Router();

//controlador

const controladorUsuarios = require("../controllers/controladorUsuarios");

//registro

router.get("/register", controladorUsuarios.register);

router.post("/register", controladorUsuarios.processRegister);

// logueo en formulario

router.get("/login", controladorUsuarios.login);

router.post("/login", controladorUsuarios.processLogin);

// cerrar cesion de usuario

router.get("/logout", controladorUsuarios.logout);

module.exports = router;
