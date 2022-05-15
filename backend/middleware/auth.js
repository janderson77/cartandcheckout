const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");
const db = require("../db");

function authRequired(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;
    return next();
  }catch (err) {
    let unauthorized = new Error("You must authenticate first.");
    unauthorized.status = 401;
    return next(unauthorized);
  };
};

async function ensureCorrectUser(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;

    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;

    const userid = await db.query(`
      SELECT username
      FROM users
      WHERE userid = $1
    `,[req.body.userid])

    if (req.username === userid.rows[0].username) {
      return next();
    };

    throw new Error();
  }catch (e) {
    const unauthorized = new Error("You are not authorized.");
    unauthorized.status = 401;

    return next(unauthorized);
  };
};

module.exports = {
    authRequired,
    ensureCorrectUser
};