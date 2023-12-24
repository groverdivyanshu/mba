import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/Order.js";
import { Payment } from "../models/Payment.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const placeOrder = asyncError(async (req, res, next) => {
  
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = req.user._id; //!use it to avoid google user id.// ! for the API testing on postman --> const user = "req.user._id";
// now all together in one variable orderOptions
  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };
// this Order is come from Order schema. And hear crate orderOptions. by using this step i do placeOrder
  await Order.create(orderOptions);
// this is success massage
  res.status(201).json({
    success: true,
    message: "Order Placed Successfully via Cash On Delivery",
  });
});

export const placeOrderOnline = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = req.user._id;// ! for the API testing on postman --> const user = "req.user._id";

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };
    // this is help from --> https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/#api-sample-code
  const options = {
    amount: Number(totalAmount) * 100,  //  har i received totalAmount from req.body but  received data as a string so convert it as a number i add Number(totalAmount) . in razorpay received money as a  Paisa  so convert it as  Rs and 100 Paisa 1 Rs    so into(*) with 100 
    currency: "INR",//set currency
  };
  const order = await instance.orders.create(options);// use instance from server.js    .   hear order crate by use ing options line 65 

  res.status(201).json({
    success: true,
    order,
    orderOptions,
  });
});
   
export const paymentVerification = asyncError(async (req, res, next) => {
  const {  // this project do it through handler      //! help from --> https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/#15-store-fields-in-server
    razorpay_payment_id, // this 3 come from razorpay as it is  . this is by default 
    razorpay_order_id, // this 3 come from razorpay as it is  . this is by default
    razorpay_signature, // this 3 come from razorpay as it is  . this is by default  . this signature crate razorpay_payment_id + razorpay_order_id + some algorithm 
    orderOptions, // but add this by manually .it come from 54 .  it send it to front end 
  } = req.body;

   const body = razorpay_order_id + "|" + razorpay_payment_id;// ! for the API testing on postman --> comment out this line mean //
// by using crypto i add algorithm . and this (sha256) is algorithm method. then pass a secret key for secret key i pass  process.env.RAZORPAY_API_SECRET i use it in server.js file line 10 . then update the body and digest it . using this whole algorithm  crate a very long form signature
// ! for the API testing on postman -->comment out this 4 line mean // 88-92
   const expectedSignature = crypto 
     .createHmac("sha256",process.env.RAZORPAY_API_SECRET)
     .update(body)
     .digest("hex");
// now this 2 both signature are match then payment actual authentic
  const isAuthentic = expectedSignature === razorpay_signature; // ! for the API testing on postman -->comment out this line mean //
  // const isAuthentic = true;  // ! for the API testing on postman --> use this line --> const isAuthentic = true; otherwise comment out this line mean //

  if (isAuthentic) { //isAuthentic so add this 3 in Payment schema 
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await Order.create({
      ...orderOptions,// create a new schema  , which i received  from orderOptions
      //  user: "req.user._id",// ! for the API testing on postman --> use this line otherwise comment out this line mean // MEAN FOR API USE --> user: "req.user._id"
      paidAt: new Date(Date.now()), // paidAt present in Payment schema
      paymentInfo: payment._id,//paymentInfo from Order.js schema
    });

    res.status(201).json({
      success: true,
      message: `Order Placed Successfully. Payment ID: ${payment._id}`,
    });
  } else {
    return next(new ErrorHandler("Payment Failed", 400));
  }
});

export const getMyOrders = asyncError(async (req, res, next) => { //find from Order schema 
  const orders = await Order.find({
    user: req.user._id,
  }).populate("user", "name");//Specifies paths which should be populated with other documents.mean  hear i add user schema by using this --> .populate("user",  now i  want to access only name from the schema by using --> "name");

  res.status(200).json({
    success: true,
    orders,//
  });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name"); // hear using (req.params.id) i  access  url id mean "/order/:id"                           

  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAdminOrders = asyncError(async (req, res, next) => { // find all order with user name  
  const orders = await Order.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});
export const processOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));
// now if orderStatus === "Preparing so ready it for shipped if shipped is ready then ready for delivered and note delivered date  if order is delivered so save it complect all by using order.save(); other-wise do not save  and not show any update
  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("Food Already Delivered", 400));

  await order.save();

  res.status(200).json({
    success: true,
    message: "Status Updated Successfully",
  });
});
