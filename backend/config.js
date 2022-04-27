require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "cartandcheckout_db_test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'cartandcheckout_db';
}

console.log("Using database", DB_URI);

module.exports = {
  SECRET,
  PORT,
  DB_URI,
};