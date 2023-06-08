const mongoose = require("mongoose");

const report = mongoose.Schema(
    {
        Text : {
            type : String
        },
        ReportedBy : {
            type : String
        },
        ReportedWhom : {
            type : String
        },
        Concern : {
            type : String
        },
        Post_id : {
            type : String
        },
        Subg_id : {
            type : String
        },
        ButtonState : {
            type : String
        },
        CreationDate : {
            type : String
        }
    }
)
module.exports = mongoose.model("Report", report);
