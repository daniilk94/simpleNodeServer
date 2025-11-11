import express from 'express';
const router = express.Router();

const data = [
    {
       "id": 1,
       "forename": "John",
       "surname": "Johnes" 
    },
    {
       "id": 2,
       "forename": "Dana",
       "surname": "White" 
    },
    {
       "id": 3,
       "forename": "Mike",
       "surname": "Tyson" 
    },
    {
       "id": 4,
       "forename": "Frank",
       "surname": "Lampard" 
    }
]

router.get('/', function(req,res,next){
    res.status(200).json(data);
})

export default router;