const mysql = require('mysql2/promise');

// Create connection to database
const pool = mysql.createPool({
    host: 'sqlserver', // sqlserver when on docker
    user: 'root',
    password: 'Syst3mAdm!n',
    database: 'web_dev',
    connectionLimit: 10
})

module.exports = { pool };