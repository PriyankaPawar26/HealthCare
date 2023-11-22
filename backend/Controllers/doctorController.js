const Booking = require("../models/BookingSchema");
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
      message: "Successfully Updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Delete" });
  }
};

const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
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
  try {
    const searchTerm = req.query.searchTerm || '';
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
        name: { $regex: new RegExp(searchTerm, 'i') }
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.json({ doctors });
    res
      .status(200)
      .json({ success: true, message: "Doctors Found", data: doctors });

 
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId

  try {
     const doctor = await Doctor.findById(doctorId)

     if(!doctor){
      return res.status(404).json({success:false, message:"Doctor not Found"})

     }

     const {password, ...rest} = doctor._doc
     const appointments = await Booking.find({doctor: doctorId})
     res.status(200). json({success:true, message:"Profile info is getting", data:{...rest, appointments}})
  } catch (error) {
    res.status(500).json({success:false, message:"Something went Wrong, cannot get"})
  }
};



module.exports = { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor, getDoctorProfile };
