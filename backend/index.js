
const express = require("express")
const db = require("./config/dbConnection")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const RegisterAndLoginRoute = require("./Routers/registerAndlogin")
const userRouter = require("./Routers/user")
const doctorRouter = require("./Routers/doctor")

dotenv.config()
const app= express()
const port = process.env.PORT || 8000

const corsOptions ={
    origin:true
}


// middleware

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/api/v1/auth', RegisterAndLoginRoute)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/doctors', doctorRouter)

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})