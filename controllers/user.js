import { asyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
// import { sendMail } from "../middlewares/sendMail.js";
// import crypto from 'crypto';
// import cloudinary from 'cloudinary';



export const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists massage come from backend crontroller register" });
    }

    //  add by me 
    // if (email) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User  email already exists massage come from backend crontroller" });
    // }

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });

    // user = await User.create({
    //   name,
    //   email,
    //   password,
    //   avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    // });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password");
      // .populate("posts followers following");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(String(password));

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
   
  

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const myProfile = (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     // when i log in USING  passport then in req.user  already present user . mainly using this i access all data of user which is exist in data base . because i use passport in  utils/Provider.js line 23  mainly passport directly use user so i learn use it from there 
//     user: req.user,
//   });
// };

// export const logout = (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) return next(err);
//     // connect.sid is by default name of cookie .    it destroys the session of the user making the request using req.session.destroy(). Then, it clears a cookie named "connect.sid" using res.clearCookie()
//     res.clearCookie("connect.sid",{
//       // secure:false,
//       // httpOnly:false,
//       // sameSite:false,       
//     }
//     );
//     res.status(200).json({
//       message: "Logged Out",
//     });
//   });
// };

export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await User.find({}); // find all user mean how much total user  
  res.status(200).json({
    success: true,
    users,
  });
});

export const getAdminStats = asyncError(async (req, res, next) => {
  const usersCount = await User.countDocuments();  // counts the number of documents that match filter

  const orders = await Order.find({});
// hear filter work as an arr
  const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
  const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

  let totalIncome = 0;

  orders.forEach((i) => {
    totalIncome += i.totalAmount; // iterate all (+) on totalAmount
  });

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length, // this is total of 3
      preparing: preparingOrders.length,
      shipped: shippedOrders.length,
      delivered: deliveredOrders.length,
    },
    totalIncome,
  });
});




// export const contact = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;

//     await sendMail(userMessage);

//     return res.status(200).json({
//       success: true,
//       message: "Message Sent Successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

