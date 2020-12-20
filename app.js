const express = require('express');
const resultRouter = require('./routes/resultRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("HELLO WORLD!!!");
    next();
});

//mounting of router
app.use('/api/v1/results', resultRouter); 

module.exports = app;