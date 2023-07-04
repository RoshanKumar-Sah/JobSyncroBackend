const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const convertCase = (value) => {
    return value.toLowerCase()
}

const JobSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    applicationMethod: {
        type: [String],
        enum: ["online", "email", "in person"],
        required: true,
        set: convertCase
    },
    applicationSource: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: [String],
        enum: ["applied", "under review", "interview sceduled", "interviewed", "offer sent", "offer accepted", "rejected"],
        required: true,
        set: convertCase
    },
    deadline: {
        type: Date
    },
    interviewDate: {
        type: Date
    },
    interviewType: {
        type: [String],
        enum: ["phone", "video", "in person"]
    },
    interviewNote: {
        type: String
    },
    offerDetails: {
        type: String
    },
    rejctionReason: {
        type: String
    },
    location: {
        type: String
    },

    created_by: {
        type: ObjectId,
        ref: "User",
        required: true
    }
   
},
{
    timestamps: true
});

module.exports = mongoose.model("Job", JobSchema)