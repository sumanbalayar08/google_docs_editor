const mysql=require("mysql")

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12726891",
    password: "m8ueuNCkrs",
    database: "sql12726891",
});

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  module.exports = db;
