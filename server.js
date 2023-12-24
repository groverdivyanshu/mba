import app from "./app.js"; // must --> when import must add .js overwise ready to show err
import { connectDB } from "./config/database.js"; // add db 
import cloudinary from "cloudinary";

import Razorpay from "razorpay";

connectDB(); //! use it to call our db

// USE AS IT IS  -->  // this is help from --> https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/#api-sample-code
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// for testing 
app.get("/", (req, res, next) => {
  res.send("<h1>Working</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server is working on PORT: ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`
  )
);
