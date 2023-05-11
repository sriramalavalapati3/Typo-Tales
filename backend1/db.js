const mongoose = require('mongoose');
require('dotenv').config()


const connection = mongoose.connect("mongodb+srv://vishalpadaswan3:vishal@cluster0.907cq.mongodb.net/typo_tales?retryWrites=true&w=majority")

module.exports= {connection}