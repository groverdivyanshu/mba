import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, paymentVerification } from "../../redux/actions/order";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { server } from "../../redux/store";

const ConfirmOrder = () => {
  // shippingInfo,
  //   orderItems,
  //   paymentMethod,
  //   itemsPrice,
  //   taxPrice,
  //   shippingCharges,
  //   totalAmount,

  const [paymentMethod, setPaymentMethod] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } =
    useSelector((state) => state.cart); // this all data come from  \src\redux\reducers\cartReducer.js
              const { message, error } = useSelector((state) => state.order); // accept err or success massage from this page reducer mean orderReducer   where this reducer give me every perfect err mean cod have different err , and if online then have different err

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true); // this is disable button until form will be submitted

    if (paymentMethod === "COD") { // if cod so received data from  /redux/actions/order.js/4
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          paymentMethod,
          subTotal,
          tax,
          shippingCharges,
          total
        )
      );
    } else {
      // createorderonline

      const {
        data: { order, orderOptions }, // hear detacher order, orderOptions  which come from backend\controllers\order.js\73 & 74
      } = await axios.post(
        "/api/v1/createorderonline",
        { // this all data come from    backend\controllers\order.js\43 .  ok but some name not match like orderItems: cartItems, itemsPrice: subTotal, taxPrice: tax, totalAmount: total, this name will be changed via colon(:) . match with line 37-43 in upper side . this line mean orderItems i received as name of cartItems
          shippingInfo,
          orderItems: cartItems,
          paymentMethod,
          itemsPrice: subTotal,
          taxPrice: tax,
          shippingCharges,
          totalAmount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const options = {
        key: "rzp_test_JIzRb9DaRDNmW0", // pass anything under the quotation
        amount: order.amount,
        currency: "INR",
        name: "BURGER KING 🍔", //pass anything . pass your app name 
        description: "Burger App", // pass anything
        order_id: order.id,
        handler: function (response) { // pass this 3 item  ↓↓↓ from backend/controller/odder.js/80-82
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          dispatch(
            paymentVerification(
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions  // this orderOptions come from  line 50
            )
          );
        },

        theme: {
          color: "#9c003c",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" }); // this emptyState come from  \src\redux\reducers\cartReducer.js\71
      navigate("/paymentsuccess");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      setDisableBtn(false);
    }
  }, [dispatch, message, error, navigate]);

  return (
    <section className="confirmOrder">
      <main>
        <h1>Confirm Order</h1>

        <form onSubmit={submitHandler}>
          <div>
            <label>Cash On Delivery</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPaymentMethod("COD")}
              required
            />
          </div>
          <div>
            <label>Online</label>
            <input
              type="radio"
              required
              name="payment"
              onChange={() => setPaymentMethod("Online")}
            />
          </div>

          <button disabled={disableBtn} type="submit">
            Place Order
          </button>
        </form>
      </main>
    </section>
  );
};

export default ConfirmOrder;
