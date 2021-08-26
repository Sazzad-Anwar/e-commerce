//@Description:Controller for main application
const asyncHandler = require('express-async-handler');
const { response,pagination,localTimeString } = require('../middlewares/middlewares');

const home = asyncHandler(async(req,res)=>{
    let data ={
        'data':'hello'
    }
    res.json(response(true,200,"Success",data));
});


module.exports ={
    home
}