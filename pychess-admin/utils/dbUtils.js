const { connection } = require('../config/dbConfig');

const dbQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result, fields) => {
            if (err) {
                console.error('Error executing query: ', err);
                return reject(err);
            }
            else {
                const rows = Object.values(JSON.parse(JSON.stringify(result)));
                resolve(rows);
            }
        })
    })
}

module.exports = { dbQuery }