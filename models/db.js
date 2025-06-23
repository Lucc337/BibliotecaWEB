const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'biblioteca_user',
  password: 'senha123',  
  database: 'biblioteca_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL conectado!');
});

module.exports = db;
