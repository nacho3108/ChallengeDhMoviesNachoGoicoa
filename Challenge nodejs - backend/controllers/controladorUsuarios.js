const bcrypt = require("bcryptjs");
const db = require("./../database/models");
const todosUsuarios = db.user;
const sequelize = db.sequelize;
const crypto = require("crypto");

const controladorUsuario = {
  register: (req, res) => {
    return res.render("register");
  },

  processRegister: (req, res) => {
    const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    todosUsuarios
      .create(newUser)
      .then(() => {
        return res.redirect("login");
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },

  login: (req, res) => {
    return res.render("login");
  },

  processLogin: (req, res) => {
    todosUsuarios
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let userData = user.dataValues;
            delete userData.password;
            req.session.user = userData;
            if (req.body.token) {
              const token = crypto.randomBytes(64).toString("base64");
              user
                .update({ remember_token: token })
                .then(() => {
                  res.cookie("rememberToken", token, {
                    maxAge: 24 * 60 * 60 * 1000,
                  });
                  return res.redirect("/");
                })
                .catch((error) => {
                  return res.redirect(error);
                });
            }
          } else {
            return res.render("login", {
              errors: {
                email: {
                  msg: "Los datos son inválidos",
                },
              },
            });
          }
        } else {
          return res.render("login", {
            errors: {
              email: {
                msg: "No se encuentra registrado el email",
              },
            },
          });
        }
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },

  logout: (req, res) => {
    req.session.destroy();

    res.cookie("rememberToken", null, { maxAge: -1 });

    res.redirect("/");
  },
};

module.exports = controladorUsuario;
