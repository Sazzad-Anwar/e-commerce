require('dotenv').config();
module.exports ={
    'url': process.env.NODE_ENV ==='dev'? 'http://localhost:8080':'',
    "env":"dev"
}