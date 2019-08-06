const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')


let Schema = mongoose.Schema
let pagerank = {
    title: String,
    rank: Number
}

let characterSchema = new Schema({
    titles:[{
        type: String,
    }],
    allegiance: [{
        type: String,
    }],
    books: [{
        type: String,
    }],
    image: {
        type: String,
        required: false
    },
    name: {
        type: String,
        default: false,
        required: [true,"El nombre es obligatorio"]
    },
    slug: {
        type: String,
        default: false
    },
    gender: {
        type: String,
        default: false
    },
    culture: {
        type: String,
    },
    birth: {
        type: Number,
    },
    alive: {
        type: Boolean,
    },
    pagerank: {
        type:{
            title:String,
            rank: Number
        }
    },
    created_at:{
        type: Date,

    },
    updated_at:{
        type: Date
    }   
});


//characterSchema.plugin( uniqueValidator,{message: '{PATH} debe ser único'})

module.exports = mongoose.model('Character',characterSchema);
