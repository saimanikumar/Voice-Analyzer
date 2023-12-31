const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    wordFrequencies: {
        type: Map,
        of: Number,
        default: {},
      },

}, {timestamps:true}
)
module.exports = mongoose.model("User", userSchema)