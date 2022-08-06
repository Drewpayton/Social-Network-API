const express = require('express');
db = require('./config/connection');


const PORT = 3001 || process.env.PORT;
const app = express();

db.once('open', () => {
    app.listen(PORT, () => console.log(`The server has started on http://localhost:${PORT}`))
})

