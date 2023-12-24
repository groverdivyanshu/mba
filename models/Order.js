import mongoose from "mongoose";

const schema = new mongoose.Schema({
  shippingInfo: {
    hNo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },

  orderItems: {
    cheeseBurger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },

    vegCheeseBurger: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },

    burgerWithFries: {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  },
// hear  where come from user
  user: {
    // user come from mongoose.Schema.ObjectId,
    type: mongoose.Schema.ObjectId,
    // ↓↓↓ hear you  go User.js schema  for reference
    ref: "User",
    required: true,
  },

  paymentMethod: {
    type: "String",
    enum: ["COD", "Online"],
    default: "COD",
  },

  paymentInfo: {
    
    type: mongoose.Schema.ObjectId,
        // ↓↓↓ hear you  go Payment.js schema  for reference
    ref: "Payment",
  },
  paidAt: Date,

  itemsPrice: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingCharges: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", schema);
