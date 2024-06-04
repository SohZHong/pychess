const mysql = require('mysql2/promise');

// Create connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Syst3mAdm!n',
    database: 'web_dev',
    connectionLimit: 10
})

const connect = () => {
    connection.connect(err => {
        if (err){
            console.log("An error occured while connecting to the database");
            throw err;
        }
        else {
            console.log("Connected to database");
        }
    })
}

module.exports = {pool, connect};