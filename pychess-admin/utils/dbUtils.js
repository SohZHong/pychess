const { connection } = require('../config/dbConfig');

const dbQuery = async (sql, params = []) => {
    try {
        await connection.beginTransaction();
        const result = connection.query(sql, params);
        await connection.commit();
        await connection.end();
        const rows = Object.values(JSON.parse(JSON.stringify(result)));
        return Promise.resolve(rows);
    } catch (err) {
        // Reverse changes made
        await connection.rollback();
        await connection.end();
        console.log('Error executing query: ', err)
        return Promise.reject(err);
    }
};

// Function to execute multiple queries at once
const dbMultiQuery = async (queries, params) => {
    // Validate if length of parameters matches queries
    if (queries.length !== params.length) {
        return Promise.reject('Provided parameters do not match the amount of queries');
    };
    try {
        await connection.beginTransaction();
        const queryPromises = [];

        // Execute each query within array
        queries.forEach((query, index) => {
            queryPromises.push(connection.query(query, params[index]));
        });

        const results = Promise.all(queryPromises);
        await connection.commit();
        await connection.end();
        const rows = Object.values(JSON.parse(JSON.stringify(results)));
        return Promise.resolve(rows);
    } catch (err) {
        await connection.rollback();
        await connection.end();
        return Promise.reject(err)
    }
}

module.exports = { dbQuery, dbMultiQuery }