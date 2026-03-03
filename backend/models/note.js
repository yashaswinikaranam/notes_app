const mongoose = require('mongoose')
const {Schema} = mongoose;

const noteSchema = new Schema({
    userId:String,
    title:String,
    content:String,
    createdAt:Date,
})

module.exports= mongoose.model('Note',noteSchema)