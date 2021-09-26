const db = require("../database/models");
const todosUsuarios = db.User;

module.exports = async function (req, res, next) {
  if (req.session.user){
    res.locals.user = req.session.user;
    return next();
  } 
    else if (req.cookies.rememberToken) {
    const token = await todosUsuarios.findOne({
      where: { remember_token: req.cookies.rememberToken },
    });

    if (token) {
      res.locals.user = token;
      req.session.user = token;
    }
  }
  next();
};
