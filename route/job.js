const express = require("express")
const validateSchema = require("../middleware/validateSchema")
const { JobSchema } = require("../schema/jobSchema")
const { fetchJob, createJob, updateJob, fetchSingleJob } = require("../controller/job")
const { authentication } = require("../middleware/authentication")
const router = express.Router()




router.get("/jobs", authentication(process.env.JWT_SECRET_KEY), fetchJob)
router.get("/jobs/:id", authentication(process.env.JWT_SECRET_KEY), fetchSingleJob)
router.post("/jobs",authentication(process.env.JWT_SECRET_KEY), validateSchema(JobSchema), createJob)
router.put("/jobs/:id",authentication(process.env.JWT_SECRET_KEY), validateSchema(JobSchema), updateJob)


module.exports = router