const mongoose = require('mongoose');
const validator = require('validator');

const resultSchema = new mongoose.Schema({
    candidate: {
        name: {
            type: String,
            required: [true, 'A Candidate must have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'A tour name must have less or equal then 40 characters'],
            minlength: [1, 'A tour name must have more or equal then 1 characters']
        },
        email_address: {
            type: String,
            required: [true, 'A candidate must have a email-address']
        }
    },
    test_score: {
        First_score: {
            type: Number,
            required: true,
            default: 0.0,
            min: [0, 'Test score must be above 0.0'],
            max: [10, 'Test score must be below 10.0']
        },
        Second_score: {
            type: Number,
            required: true,
            default: 0.0,
            min: [0, 'Test score must be above 0.0'],
            max: [10, 'Test score must be below 10.0']
        },
        Third_score: {
            type: Number,
            required: true,
            default: 0.0,
            min: [0, 'Test score must be above 0.0'],
            max: [10, 'Test score must be below 10.0']
        }
    },
   
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;