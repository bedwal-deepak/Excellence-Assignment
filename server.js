const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
.connect(DB, {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify: false,
useUnifiedTopology: true
})
.then( () => console.log('DB connection is successful!'));


const port  = process.env.PORT || 3000;
app.listen(port, () => {    //this call back function will be called when server starts
    console.log(`App running on port ${port}...`);
});