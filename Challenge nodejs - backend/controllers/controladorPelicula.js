const db = require("./../database/models");
const todasMovies = db.Movie;
const todosGenres = db.Genre;
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const moviesController = {
  //get detail movie
  detail: (req, res) => {
    todasMovies
      .findByPk(req.params.id, {
        include: [{ association: "genre" }, { association: "actors" }],
      })
      .then((detail) => {
        return res.render("detailMovies", {detail});
      })
      
      .catch((error) => {
        return res.redirect(error);
      });
  },

  //  GET  create form
  
  add: (req, res) => {
    todosGenres
      .findAll()
      .then((genre) => {
        return res.render("createMovies", {genre});
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },
  // POST create form
  create: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const newMovie = {
        ...req.body,
        genre_id: req.body.genre,
      };
      todasMovies
        .create(newMovie)
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => {
          return res.redirect(error);
        });
    } else {
      todosGenres
        .findAll()
        .then((genre) => {
          return res.render("createMovies", {
            errors: errors.mapped(),
            old: req.body,
            genre,
          });
        })
        .catch((error) => {
          return res.redirect(error);
        });
    }
  },

  /// GET  edit form
  update: (req, res) => {
    const updateMovie = todasMovies.findByPk(req.params.id, {
      include: ["genre"],
    });
    const updateGenre = todosGenres.findAll();

    Promise.all([updateMovie, updateGenre])
      .then(([movie, genre]) => {
        return res.render("editMovies", { movie, genre });
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },

  //post edit form
  edit: function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      todasMovies
        .update(
          { ...req.body, genre_id: req.body.genre },
          { where: { id: req.params.id } }
        )
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => {
          return res.redirect(error);
        });
    } else {
      const updateMovie = todasMovies.findByPk(req.params.id, {
        include: ["genre"],
      });
      const updateGenre = todosGenres.findAll();

      Promise.all([updateMovie, updateGenre])
        .then(([movie, genre]) => {
          return res.render("editMovies", {
            errors: errors.mapped(),
            old: req.body,
            genre,
            movie,
          });
        })
        .catch((error) => {
          return res.redirect(error);
        });
    }
  },

  // DELETE

  delete: function (req, res) {
    todasMovies.findByPk(req.params.id).then((movies) => {
      return res.render("deleteMovies", { movies });
    });
  },

  destroy: function (req, res) {
    todasMovies
      .destroy({ where: { id: req.params.id }, force: true })
      .then(() => {
        return res.redirect("/");
      })
      .catch(() => {
        return res.send(error);
      });
  },
};

module.exports = moviesController;
