const Joi = require('joi');

const JobSchema = Joi.object({
    companyName: Joi.string()
        .max(100)
        .required(),
    jobTitle: Joi.string()
        .required(),

    applicationDate: Joi.date()
        .required(),
    applicationMethod: Joi.string()
        .lowercase()
        .valid("online", "email", "in person")
        .required(),
    applicationSource: Joi.string()
        .required(),
    applicationStatus: Joi.string()
        .lowercase()
        .valid("applied", "under review", "interview sceduled", "interviewed", "offer sent", "offer accepted", "rejected")
        .required(),
    deadline: Joi.date(),
    interviewDate: Joi.date(),
    interviewType: Joi.string()
        .lowercase()
        .valid("phone", "video", "in person"),
    interviewNote: Joi.string(),
    offerDetails: Joi.string(),
    rejctionReason: Joi.string(),
    location: Joi.string()
        .required()

})

module.exports = {
    JobSchema
}