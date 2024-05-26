const express = require('express');
const path = require('path');
const database = require('./database');

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
    res.send("API Working!");
});

app.get('/api/system/users', async (req, res) => {
    try {
        const attribute = req.query.attribute; //attribute parameter
        const users = await database.selectSysUsersByColumns(attribute);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(port, () => {
    database.connect();
    console.log(`Server listening on port ${port}`);
});
