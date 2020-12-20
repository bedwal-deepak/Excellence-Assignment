# Excellence-assignment
Technologies used:- Nodejs, Expessjs, MongoDB

# You can use either local machine or mongoAtlas for mongodb database

# To create the record of a candidate (POST)
Url:- 127.0.0.1:3000/api/v1/results/
Body(format->json):- 
// Here Score will be out of 10
{
    "candidate": {
        "name": "Deepak",
        "email_address": "deepakbedwalb5@gmail.com"
    },
    "test_score": {
        "First_score": 9,
        "Second_score": 9,
        "Third_score": 9
    }
}

# To find the candidate's records (GET)
Url:- 127.0.0.1:3000/api/v1/results/

# To find record of individual candidate by _id (GET)
Url:- 127.0.0.1:3000/api/v1/results/_id

# To delete the candidate's record by _id (DELETE)
Url:- 127.0.0.1:3000/api/v1/results/_id

# To update the candidae's record by _id (PATCH)
Url:- 127.0.0.1:3000/api/v1/results/_id

# To find the average marks of each round (GET)
Url:- 127.0.0.1:3000/api/v1/results/avg-marks

# To find the highest marks amongst all the candidates (GET)
Url:- 127.0.0.1:3000/api/v1/results/highest-marks
 
