const express = require('express');
const resultController = require('./../controllers/resultController');
const router = express.Router();

router
    .route('/avg-marks')
    .get(resultController.getAvgMarksOfEachRound);

    router
    .route('/highest-marks')
    .get(resultController.getHighestMarks);    

router
    .route('/')
    .get(resultController.getAllRecords)
    .post(resultController.createRecord);

router
    .route('/:id')
    .get(resultController.getRecord)
    .patch(resultController.updateRecord)
    .delete(resultController.deleteRecord);

module.exports = router;    