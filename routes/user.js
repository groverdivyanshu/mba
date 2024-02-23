import express from "express";
import passport from "passport";

import {
  getAdminStats,
  getAdminUsers,
  // logout,
  myProfile,
  register, 
  login,
   logout,
  // contact,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"; 

// to invoke routes 
const router = express.Router();

// // i request which url    ---> http://localhost:4000/api/v1/googlelogin
// router.get("/googlelogin",
// // pass handler --> passport.authenticate  then pass strategy -->  google  .  next pass , need which information pass it on scope --> scope: ["profile"],
//  passport.authenticate("google", {
//   // hear i need profile information so add it  
//     scope: ["profile" ], //"email"],
//   })
// );



// // router.get(
// //   "/login",

// //   passport.authenticate("google",{
// //     // Redirect to FRONTEND_URL which i add on dotenv .   now at the moment i add local host 4000 but in real time add hear front end link
// //       successRedirect:  process.env.FRONTEND_URL,
// //   })
// // );



// //? now set  after google log in go to  this urlRedirect to FRONTEND_URL which i add on dotenv .   now at the moment i add local host 4000 but in real time add hear front end link

// // router.get(
// //   "/login",
// //   (req, res, next) => {
// //     passport.authenticate("google", {
// //       // successRedirect: "/api/v1/me",
// //       // successRedirect: "http://localhost:3000/",
// //       successRedirect: process.env.FRONTEND_URL,
// //       // failureRedirect: "/login/failed"
// //     })
// //    }
// // );
// // router.get("/login/failed", (req, res) => {
// //   res.status(401).json({ success: false, message: "Authentication failed now try again to log in" });
// // });


// router.get(
//   "/login",

//   passport.authenticate("google"),
//   (req, res, next) => {
//     // res.redirect("/api/v1/me");
//     // res.redirect('http://localhost:3000');
//     res.send("<h1>LOG IN </h1>")
//     // res.redirect('https://burger-app-backend-v1.onrender.com');
//   }
// );

// // when login  then see myProfile which exist on  \controllers\user.js  5 - 11 .isAuthenticated --> it check if yes so 
// router.get("/me", isAuthenticated, myProfile);
// // add log out page 
// router.get("/logout", logout);









// import { register, login, logout } from './controller'; // Assuming the controller file is named 'controller.js'

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, myProfile);



// Admin Routes  this routes only accessible for admin . add authorizeAdmin middle wear from  ../middlewares/auth.js line 11 - 17 . HEAR ADMIN AS A USER , HEAR ADMIN ACCESS FOR  SHOW THE  statistic chart of  product  
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);



// router.post("/contact",contact);


export default router;
