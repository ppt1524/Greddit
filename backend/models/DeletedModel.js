const mongoose = require("mongoose");

const deletedmodel = mongoose.Schema(
    {
        Deleted : {
            type : Array
        },
        Reported : {
            type : Array
        },
        Subg_id : {
            type : String
        }
    }
)
module.exports = mongoose.model("Deleted_model", deletedmodel);
