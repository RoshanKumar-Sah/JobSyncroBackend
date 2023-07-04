
const Job = require("../model/Job")

const fetchJob = (req, res, next) => {

    try {

        // console.log(req.headers.authorization);
    } catch (err) {
        console.log(err);
    }


}

const fetchSingleJob = async (req, res, next) => {

    try {


        console.log(req.user._id);

        let job = await Job.findById(req.params.id)



        if (job) {
            // console.log(job);
            if (req.user._id == job.created_by) {
                return res.send(job)
            }
            return res.status(403).send({ msg: "not posted by this user" })

        }

        res.status(404).send({ msg: "resource not found" })

    } catch (err) {
        next(err)
    }

}


const createJob = async (req, res, next) => {
    // console.log(req.body);

    try {

        let temp = { ...req.body }
        // console.log(req.user._id);
        let job = await Job.create({ ...temp, created_by: req.user._id })

        res.send(job)

    } catch (err) {
        next(err)
    }
}


const updateJob = async (req, res, next) => {
    // console.log(req.body);
    try {
        // console.log(req.params.id);

        let job = await Job.findById(req.params.id)
        // console.log(job.created_by);

        if (job) {
            if (job.created_by == req.user._id) {


                let updated_job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })

                return res.send(updated_job)
            }
            return res.status(403).send({ msg: "This job wasn't posted by this user" })
        }

        return res.status(404).send({ msg: "Resource not found" })



    } catch (err) {
        next(err)
    }
}


module.exports = {
    fetchJob,
    fetchSingleJob,
    createJob,
    updateJob
}