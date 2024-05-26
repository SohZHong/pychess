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

const buildQuery = (sql, param = null) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, param, (err, result, field) => {
            if (err) {
                return reject(err);
            }
            else {
                resolve(Object.values(JSON.parse(JSON.stringify(result))));
            }
        })
    })
}

const selectSysUsersByColumns = async (attribute = '*') => {
    let sql;
    let param;

    if (attribute === '*' || !attribute) {
        sql = `SELECT * FROM sys_user`;
        param = [];
    } else {
        const columns = attribute.split(',').map(col => col.trim());
        sql = `SELECT ?? FROM sys_user`;
        param = [columns];
    }

    return await buildQuery(sql, param);
}

module.exports = {connection, connect, selectSysUsersByColumns};