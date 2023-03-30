const mongoose = require('mongoose');
require('dotenv').config()
const connection = mongoose.connect("mongodb+srv://saurabh:saurabh@cluster0.hovcp.mongodb.net/Typing_Tales?retryWrites=true&w=majority")

module.exports= {connection}