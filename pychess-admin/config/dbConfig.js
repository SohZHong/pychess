const mysql = require('mysql');

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web_dev',
    multipleStatements: true
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

module.exports = {connection, connect};