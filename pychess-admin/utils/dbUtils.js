const { pool } = require('../config/dbConfig');

// High order function for database transaction handling
const transaction = async (operation) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await operation(connection);
        await connection.commit();
        return Promise.resolve(result);
    } catch (err) {
        await connection.rollback();
        console.log('Error executing query: ', err);
        return Promise.reject(err)
    } finally {
        connection.release();
    }
};

const dbQuery = async (sql, params = []) => {
    return transaction(async (connection) => {
        const [result, fields] = await connection.query(sql, params);
        const rows = result; // Get row results
        const insertId = result.insertId; // Get the insertId
        return { rows, insertId };
    });
};

// const dbQuery = async (sql, params = []) => {
//     const connection = await pool.getConnection();
//     try {
//         await connection.beginTransaction();
//         const [result, fields] = await connection.query(sql, params);
//         await connection.commit();
//         const rows = result[0]; // Get row results
//         const insertId = result.insertId; // Get the insertId
//         return Promise.resolve({rows, insertId});
//     } catch (err) {
//         // Reverse changes made
//         await connection.rollback();
//         console.log('Error executing query: ', err)
//         return Promise.reject(err);
//     } finally {
//         connection.release();
//     }
// };

// Function to execute multiple queries at once
const dbMultiQuery = async (queries, params) => {
    if (queries.length !== params.length) {
        return Promise.reject('Provided parameters do not match the amount of queries');
    }

    return transaction(async (connection) => {
        // Execute each query within array
        const queryPromises = queries.map((query, index) => {
            return connection.query(query, params[index]);
        });

        const results = await Promise.all(queryPromises);

        // Extract insertId and rows from each query result
        const queryResults = results.map(([result]) => ({
            rows: result,
            insertId: result.insertId
        }));
        
        return queryResults;
    });
};
// const dbMultiQuery = async (queries, params) => {
//     const connection = await pool.getConnection();
//     // Validate if length of parameters matches queries
//     if (queries.length !== params.length) {
//         return Promise.reject('Provided parameters do not match the amount of queries');
//     };
//     try {
//         await connection.beginTransaction();

//         // Execute each query within array
//         const queryPromises = queries.map((query, index) => {
//             return connection.query(query, params[index]);
//         });

//         const results = await Promise.all(queryPromises);
//         await connection.commit();
//         // Extract insertId and rows from each query result
//         const queryResults = results.map(([result]) => ({
//             rows: result,
//             insertId: result.insertId
//         }));
//         return Promise.resolve(queryResults);
//     } catch (err) {
//         await connection.rollback();    
//         return Promise.reject(err);
//     } finally {
//         connection.release();
//     }
// }

module.exports = { transaction, dbQuery, dbMultiQuery }