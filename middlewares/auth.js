import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    // Using .verify method I decoded the token for access MongoDB _id 
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Using req.user I access all data of the user and here I store user id in this req.user
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






 
  // const token = req.cookies["connect.sid"];
  // // console.log(token);
  // if (!token) {
  //   return next(new ErrorHandler("Not Logged In", 401)); // when ERROR in  basically we can passed  only err massage  but if  i want to pass statusCode as  my wishes  so it did not posable so  cerate  a new file to possible it , file exist on  \utils\ErrorHandler.js --> hear to receive err massage by using super() . and receive statusCode by using this.statusCode 
  // }
  // next();

//  //! another approch
//   const cookieName = "connect.sid";
//   console.log(cookieName);
//   if (req.cookies && req.cookies[cookieName]) {
//     // Cookie is present, user is authenticated
//     next();
//   } else {
//     // Cookie is not present, user is not authenticated
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }


// };
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};// if role only admin so then this authorizeAdmin middle wear will work 
