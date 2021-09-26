const express = require("express");
const router = express.Router();

//Requerimimos el controlador
const main = require("../controllers/controladorIndex");

// home 

router.get("/", main.home);

module.exports = router;
