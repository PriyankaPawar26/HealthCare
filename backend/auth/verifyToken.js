const jwt = require("jsonwebtoken")
const Doctor = require("../models/DoctorSchema")
const User = require("../models/UserSchema")

const authenticate = async(req,res,next)=>{
    // get token from header

    const authToken = req.headers.authorization

    // check token  is exist

    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false , message:"no token , authorization denied"})
    }

    try {
        
        const token = authToken.split(" ")[1];

        // verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id 
        req.role = decoded.role
                next(); // must call the next function
    } catch (error) {
         if(error.name === 'TokenExpiredError'){
            return res.status(401).json({message:"token is expired"})
         }
         return res.status(401).json({success:false, message:"Invalid Token"})
    }
}

// function so that only admin can find all the users

const restrict = roles=> async(req,res,next)=>{
    const userId = req.userId;
    let user;
    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if(patient){
        user= patient;
    }
    if(doctor){
        user= doctor
    }

    if(!roles.includes(user.role)){
 return res.status(401).json({success:false, message:"You are not Authorized"})
    }
    next()
}


module.exports = { authenticate ,restrict} ;