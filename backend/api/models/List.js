const mongoose = require("mongoose")


const ListSchema = mongoose.Schema(
    {
        title:{type: String, required: true},
        type: {type: String},
        content: {type: Array},
        genre: {type: String},

    }
);

module.exports = mongoose.model("List",ListSchema);