const mongoose = require("mongoose");

const date = mongoose.Schema(
    {
        Date_Posts : {
            type : Array
        },
        Date : {
            type : String
        },
        Subg_id : {
            type : String
        }

    }
)
module.exports = mongoose.model("Date_Schema", date);
