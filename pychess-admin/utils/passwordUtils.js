const bcrypt = require('bcrypt')
const saltRounds = 10 // Typically a value between 10 and 12

const encryptPassword = async (password) => {
    try {
        // Generate unique salt for each password has
        const salt = await bcrypt.genSalt(saltRounds);
        // 'hash' contains the hashed password
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const comparePassword = async (inputPassword, dbPassword) => {
    try {
        // Compare different hashes
        const match = await bcrypt.compare(inputPassword, dbPassword);
        return match;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

module.exports = { encryptPassword, comparePassword }