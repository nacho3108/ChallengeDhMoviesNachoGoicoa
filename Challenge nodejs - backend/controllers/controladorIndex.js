const db = require("./../database/models");

const todasPeliculas = db.Movie;

const sequelize = db.sequelize;

const main = {

  home: (req, res) => {
    todasPeliculas
      .findAll()
      .then((todasPeliculas) => {
        return res.render("index", {todasPeliculas});
      })
      //Si surge algun error
      .catch((error) => {
        return res.redirect(error);
      });
  },
};

module.exports = main;