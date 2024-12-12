const mysql = require('mysql2/promise');  //here mysql2/promise is very important for mysql2
const dotenv = require('dotenv').config()
// Create a connection pool to MySQL
const pool = mysql.createPool({
  host:process.env.HOST,
  user: process.env.USER,
  password:process.env.PASSWORD, 
  database: process.env.DATABASE,
});

module.exports = pool;
