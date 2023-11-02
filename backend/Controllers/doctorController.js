const Doctor = require("../models/DoctorSchema");

const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "successfully Updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to update" });
  }
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully Delete",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to Delete" });
  }
};

const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).select("-password");
    if (doctor) {
      res.status(200).json({
        success: true,
        message: "Doctor Found",
        data: doctor,
      });
    } else {
      res.status(404).json({ success: false, message: "Doctor not Found" });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "Doctor not Found" });
  }
};

const getAllDoctor = async (req, res) => {
  // const id = req.params.id;
  try {
    // for searching a doctor from search bar
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
       doctors = await Doctor.find({ isApproved: "approved"}).select("-password");
    }

    // for searching a doctor from search bar end

    res
      .status(200)
      .json({ success: true, message: "Doctors Found", data: doctors });

    res.status(404).json({ success: false, message: "Not Found" });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

module.exports = { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor };
