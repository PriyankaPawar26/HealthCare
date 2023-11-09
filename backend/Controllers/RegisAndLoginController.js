const User = require("../models/UserSchema")
const Doctor = require("../models/DoctorSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userSignupValidation, userLoginValidation } = require("../auth/validation")
const generateToken = user=>{
  return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {
    expiresIn:'15d'
  })
}
const register = async (req,res)=>{

  const {email, password, name, role, photo, gender} =    await req.body;
  try {
     let user =  null
  // checking if a user is registered or not
     if(role === 'patient'){
      user = await User.findOne({email})
     }
     else if(role == 'doctor'){
      user = await Doctor.findOne({email})
     }
    
     // check if user is exist

     if(user){
      return res.status(400).json({message:"User already Exist"})
     }
   
     // hash Password

     const salt = await bcrypt.genSalt(10)
     const hashPassword = await bcrypt.hash(password, salt)

     if(role === 'patient'){
      user = new User({
        name,
        email,
        password:hashPassword,
        photo,
        gender,
        role
      })
     }

     if(role === 'doctor'){
      user = new Doctor({
        name,
        email,
        password:hashPassword,
        photo,
        gender,
        role
      })
     }

     await user.save()

     res.status(200).json({success: true, massage:"User Successfully Created"})

  } catch (error) {
    res.status(500).json({success: false, massage:"Internal Server error, Try again"})

  }
}


const login = async (req,res)=>{

  const {email} = await req.body
  try {
    
    let user = null;
    const patient = await User.findOne({email});
    const doctor = await Doctor.findOne({email})

    if(patient){
      user = patient
    }
    if(doctor){
      user = doctor
    }
    // check if user exist or not

    if(!user){
      return res.status(404).json({message : "USer not Found"})
    }

    //compare password
  //   const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
  // if(!isPasswordMatch){
  //   return res.status(400).json({status:false, message:"Invalid Credentials "})
  // }
   
  // get Token

  const token = generateToken(user)

  const {password, role, appointments, ...rest }= user._doc

  res.status(400).json({status:true, message:"successfully Login ", token, data:{ ... rest}, role})


  // if (user.role === 'patient') {
  //   console.log("patient Page")
  //   res.status(200).json({ status: true, message: "Successfully logged in", token, data: { ...rest }, role: user.role, redirect: '/patient' });
  // } else if (user.role === 'doctor') {
  //   console.log("Doctor Page")
  //   res.status(200).json({ status: true, message: "Successfully logged in", token, data: { ...rest }, role: user.role, redirect: '/doctor' });
    
  // } else {
  //   // Handle other roles if necessary
  //   res.status(200).json({ status: true, message: "Successfully logged in", token, data: { ...rest }, role: user.role, redirect: '/' });
  // }


  } catch (error) {
    res.status(500).json({status:false, message:"Failed to login"})
  }
}

module.exports = {register, login}