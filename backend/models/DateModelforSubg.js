const mongoose = require("mongoose");

const dateforsubg = mongoose.Schema(
    {
        People : {
            type : Array
        },
        Time : {
            type : String
        },
        Subg_id : {
            type : String
        }
    }
)
module.exports = mongoose.model("Date_Schema_for_subg", dateforsubg);
