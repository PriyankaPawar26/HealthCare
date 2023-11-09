const User = require("../models/UserSchema");
const Booking = require("../models/BookingSchema")
const Doctor = require("../models/DoctorSchema")
const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    res.status(200).json({
      success: true,
      message: "successfully Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to update" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully Delete",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to Delete" });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select('-password');
    res
      .status(200)
      .json({
        success: true,
        message: "User Found",
        data: user,
      });
  } catch (err) {
    res.status(404).json({ success: false, message: "User not Found" });
  }
};


const getAllUser = async(req,res)=>{
    const id = req.params.id;
     try{
        const users = await User.find({}).select('-password')
        res.status(200).json({success:true, message:"Users Found", data:users})
     }
     catch(err){
        res.status(500).json({success:false, message:"Not Found"})
     }
}

const getUserProfile = async (req,res)=>{
  const userId = req.userId

  try {
     const user = await User.findById(userId)

     if(!user){
      return res.status(404).json({success:false, message:"User not Found"})

     }

     const {password, ...rest} = user._doc
     res.status(200). json({success:true, message:"Profile info is getting", data:{...rest}})
  } catch (error) {
    res.status(500).json({success:false, message:"Something went Wrong, cannot get"})
  }
}

const getMyAppointment = async(req,res)=>{
  try {
    // step 1 = retrieve appointment from booking

  const bookings = await Booking.find({user:req.userId})

    // step 2 = extract doctor ids from appointment bookings

    const doctorIds = bookings.map(el => el.doctor.id)
    //step 3= retrive doctors using doctor ids

    const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

    res.status(200).json({success:true, message:'Appointment are getting ', data:doctors})
  } catch (error) {
    res.status(500).json({success:false, message:"Something went Wrong, cannot get"})
    
  }
}

module.exports = { updateUser , deleteUser, getSingleUser , getAllUser, getMyAppointment ,getUserProfile};
