const User = require("../models/UserSchema");

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


module.exports = { updateUser , deleteUser, getSingleUser , getAllUser };
