const mongoose = require("mongoose");

const Subg_vis_model = mongoose.Schema(
    {
        Date : {
            type : String
        },
        Subg_id : {
            type : String
        },
        Vis : {
            type : Array
        }
    }
)
module.exports = mongoose.model("Subg_vis_model", Subg_vis_model);
