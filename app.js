// HAR HAR MOHADEV


import express, { urlencoded } from "express";
import dotenv from "dotenv";
// import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
// import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

// use express and export default
const app = express();
export default app;
// now add dotenv file by using --> dotenv.config({   .  now add path where it is exist by using   path: "./config/config.env"  . now 
dotenv.config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { 
    //     secure:false,
    //   httpOnly:false,
    //   sameSite:false,       
    //          //  process.env.NODE_ENV === "development" ?
    // },
  })
);
app.use(cookieParser());// now use it
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

// app.use(
//   cors({
//     credentials: true, // make sura it will be true otherwise cookie and meany more thing are not send 
//     origin:'http://localhost:3000',
//     //process.env.FRONTEND_URL, // add FRONTEND_URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // how meany method will be work add them 
//   })
// );
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// in whole app anywhere i can not use passport package   so use hear .          make sure use of this line after creating session  mean 21 - 26   .   It initializes passport, sets up session support, and authenticates the session
// app.use(passport.authenticate("session"));
// app.use(passport.initialize());
// app.use(passport.session());




// now call this from  \utils\Provider.js  , basically this is a GoogleStrategy code .  one must thing --> use this line must be upper side of Routes
// connectPassport();


// Importing Routes
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
// hear add prefix "/api/v1" so add it to every link
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);


app.use(express.static("build"));


// Using Error Middleware
app.use(errorMiddleware);
