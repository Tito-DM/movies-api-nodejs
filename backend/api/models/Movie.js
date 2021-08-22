const mongoose = require("mongoose")


const MovieSchema = mongoose.Schema(
    {
        title:{type: String, required: true},
        desc: {type: String},
        img:{type: String},
        imgTitle:{type: String},
        imgSm: {type: String},
        trailer:{type: String},
        video: {type: String},
        realease_year: {type: String},
        duration: {type: String},
        genre: {type: Number},
        isSerires:{type: Boolean, default:false}

    }
);


module.exports = mongoose.model("Movie",MovieSchema);

