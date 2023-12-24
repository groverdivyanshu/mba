import express from "express";
import {
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  paymentVerification,
  placeOrder,
  placeOrderOnline,
  processOrder,
} from "../controllers/order.js";
import {authorizeAdmin,  isAuthenticated } from "../middlewares/auth.js"; 

const router = express.Router();
// ! for the API testing on postman -->  REMOVED isAuthenticated, OF THIS 3 LINE 15,17,19
router.post("/createorder",isAuthenticated, placeOrder);
// create order online
router.post("/createorderonline",isAuthenticated,  placeOrderOnline);

router.post("/paymentverification", isAuthenticated, paymentVerification);

router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/order/:id", isAuthenticated, getOrderDetails);

// Add Admin Middleware this routes only accessible for admin . add authorizeAdmin middle wear from  ../middlewares/auth.js line 11 - 17 . HEAR ONLY ADMIN ACCESS AND SHOW ORDER ITEM AND THERE ID FOR    "Preparing"  "Shipped"  "Delivered" PURPOSES
router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);

export default router;
