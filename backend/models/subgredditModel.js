const mongoose = require("mongoose");

const subgreddit = mongoose.Schema(
    {
        Name : {
            type: String,
            required: true,
        },
        Description : {
            type: String,
            required: true,
        },
        Tags : {
            type: String,
            required: true,
        },
        Banned : {
            type: String,
            required: true,
        },
        Owner : {
            type: String,
            required: true, 
        },
        People : {
            type: Array,
        },
        BlockedPeople : {
            type: Array,
        },
        RequestedPeople : {
            type: Array,
        },
        LeftPeople : {
            type: Array,
        },
        Posts : {
            type: Array,
        },
        Date : {
            type : String
        },
        Image : {
            
        }
    }
)
module.exports = mongoose.model("SubGreddit", subgreddit);
