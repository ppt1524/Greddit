const mongoose = require("mongoose");

const posts = mongoose.Schema(
    {
        Text : {
            type : String
        },
        Upvotes : {
            type : Array
        },
        Downvotes : {
            type : Array
        },
        Subgreddit_id : {
            type : String
        },
        Posted_by : {
            type : String
        },
        Comments : {
            type : Array
        },
        Date : {
            type : String
        }
    }
)
module.exports = mongoose.model("Posts", posts);
