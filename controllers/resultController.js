const Result = require('./../models/resultModel');

//To get all the records of candidates
exports.getAllRecords = async (req, res) => {
    try {
        console.log(req.qurey);
        const records = await Result.find();
        //sending response
        res.status(200).json({
            status: 'success',
            results: records.length,
            data: {
                records
            }
        });
    }catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


//to get individual's record
exports.getRecord = async (req, res) => {
    try {
        const record = await Result.findById(req.params.id);
        //sending response
        res.status(200).json({
            status: 'success',
            data: {
                record
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        }); 
    }
};

// Create record for a candidate
exports.createRecord = async (req, res) => { 
    try {
        const newRecord = await Result.create(req.body);
        // sending respose
        res.status(201).json({
            status: 'success',
            data: {
                record: newRecord
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!!'
        });            
    }
};

// Updating the existing record
exports.updateRecord = async (req, res) => {
    try {
        const record = await Result.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //return updated data
            runValidators: true // if true then validate the update operation against the model's schema
        });
        //sending response
        res.status(200).json({
            status: 'sucess',
            data: {
                record
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        }); 
    }
}; 

// Deleting the record
exports.deleteRecord = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'sucess',
            //here we don't have to send the data back to client
            data: null 
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        }); 
    } 
};

// Average marks of each round for all students
exports.getAvgMarksOfEachRound = async (req, res) => {
    try{
        const record = await Result.aggregate([
        { 
            $project: 
            { test_score: { $objectToArray: "$test_score" } } 
        },
        {
            $unwind: "$test_score" 
        },
        {
            $group: {
                _id: "$test_score.k", 
                totalScore: { $sum: "$test_score.v" },
                noOfStudents: { $sum: 1 },
                avgScore: { $avg: "$test_score.v" },
            } 
        },
        {
            $project: {
                _id: 1,
                totalScore: 1,
                noOfStudents: 1,
                avgScore: 1 
            }
        }
    ]);
    // sending response    
    res.status(200).json({
        status: 'success',
        data: {
            record
        }
    });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        }); 
    }
};

// Getting highest marks among the candidates
exports.getHighestMarks = async (req, res) => {
    try{
        const record = await Result.aggregate([
            { 
                $addFields: { 
                    test_score: { $objectToArray: "$test_score" } 
                } 
            },
            { 
                $addFields: {
                    test_score: { $concatArrays: [ "$test_score", [ { "k": "total", "v": { $sum: "$test_score.v" } } ] ] } 
                } 
            } ,
            { 
                $addFields: {
                    test_score: { $arrayToObject: "$test_score" } 
                } 
            },
            { 
                $project: {
                    name: "$candidate.name",
                    test_score: { $objectToArray: "$test_score" } 
                } 
            },
            {
                $unwind: "$test_score" 
            },
            {
                $group: {
                    _id: "$test_score.total",
                    maxScore: { $max: "$test_score.v" },
                }
            },
            {
                $project: {
                    _id: 0,
                    maxScore: 1
                }
            }
    ]);
    //console.log(typeof(record));
     
   // Sending response 
    res.status(200).json({
        status: 'success',
        data: {
            record
        }
    });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        }); 
    }
};