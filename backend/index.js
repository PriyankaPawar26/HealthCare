// const express = require("express")
// const db = require("./config/dbConnection")
// const cors = require("cors")
// const cookieParser = require("cookie-parser")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// const RegisterAndLoginRoute = require("./Routers/registerAndlogin")
// const userRouter = require("./Routers/user")
// const doctorRouter = require("./Routers/doctor")
// const reviewRoute = require("./Routers/review")
// dotenv.config()
// const app= express()
// const port = process.env.PORT || 8000

// // const corsOptions ={
// //     origin:true
// // }
// // middleware
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors())

// app.use('/api/v1/auth', RegisterAndLoginRoute)
// app.use('/api/v1/users', userRouter)
// app.use('/api/v1/doctors', doctorRouter)
// app.use("/api/v1/reviews", reviewRoute)

// app.listen(port, ()=>{
//     console.log(`server is running on ${port}`)
// })


const express = require("express");
const db = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const RegisterAndLoginRoute = require("./Routers/registerAndlogin");
const userRouter = require("./Routers/user");
const doctorRouter = require("./Routers/doctor");
const reviewRoute = require("./Routers/review");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());



const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api/v1/auth', RegisterAndLoginRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use("/api/v1/reviews", reviewRoute);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
