const { ObjectId } = require("mongodb");
const { getJobById } = require("../controller/job.controller");
const Job = require("../models/Job");
const { getJobByIdService } = require("../service/job.service");


exports.checkIsOwner = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    const { id } = req.params;

    const findJob = await getJobByIdService(id);


    if (findJob.postedBy.id._id.equals(employeeId)) {
      return next();
    }
    return res.status(401).json({
      status: 'failed',
      error: "Your can't change or delete other's job post"
    })

  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
