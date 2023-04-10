const mongoose = require("mongoose")
const markSchema = new mongoose.Schema({

    studId:{
        type:String,
        required:true,
    },

    studName:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    mark:{
        type:String,
        required:true,
    },
    
},
{ timestamps: true}
);

module.exports = mongoose.model("Mark", markSchema);