const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");

function authRequired(req, res, next) {
    try {
      const tokenStr = req.body._token || req.query._token;
      let token = jwt.verify(tokenStr, SECRET);
      req.username = token.username;
      return next();
    }
  
    catch (err) {
      let unauthorized = new Error("You must authenticate first.");
      unauthorized.status = 401;
      return next(unauthorized);
    }
  }