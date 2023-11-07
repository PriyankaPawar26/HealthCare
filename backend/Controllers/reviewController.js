const Review = require("../models/ReviewSchema");
const Doctor = require("../models/DoctorSchema");
const { default: mongoose } = require("mongoose");

const getAllRrviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

// Create Review

const createReview = async (req, res) => {
  try {
    if (!req.body.doctor) {
      req.body.doctor = req.params.doctorId;
    }

    if (!req.body.user) {
      req.body.user = req.params.userId;
    }

    const newReview = new Review(req.body);
    console.log(newReview);
    const savedReview = await newReview.save();
    if (!savedReview)
      return res
        .status(500)
        .json({
          success: false,
          message: "Something error while save data in db!",
        });
    await Doctor.findByIdAndUpdate(
      { _id: req.body.doctor },
      {
        $push: { reviews: savedReview._id },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllRrviews, createReview };
