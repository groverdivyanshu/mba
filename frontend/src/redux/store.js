import { configureStore } from "@reduxjs/toolkit";

import { authReducer,contractReducer } from "./reducers/userReducer";

import { orderReducer, ordersReducer } from "./reducers/orderReducer";
import { adminReducer } from "./reducers/adminReducer";
import { cartReducer } from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact : contractReducer,
    cart: cartReducer,
    order: orderReducer,
    orders: ordersReducer,
    admin: adminReducer, 
  },
});

export default store;
//burger app  auth = social media user 
// ! add the backend server hosted link
// export const server = "http://localhost:4000/api/v1";
