import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";

// hear i access data of this ({ value, title, img, increment, decrement })  which come from  <CartItem/>  .this fun will be show on browser 
const CartItem = ({ value, title, img, increment, decrement }) => {
  return (
    <div className="cartItem">
      <div>
        <h4>{title}</h4>
        <img src={img} alt="Item" />
      </div>

      <div>
        {/* after clicking button trigger both fun which is exist to down side */}
        <button onClick={decrement}>-</button>
        <input type="number" readOnly value={value} />
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { 
    cartItems: {  // hear only import quantity because it will be changeable but price will be fixed so no need to import it  
      cheeseBurger: { quantity: cheeseBurger },
      vegCheeseBurger: { quantity: vegCheeseBurger },
      burgerWithFries: { quantity: burgerWithFries },
    }, // this all imported but no need shipping Info because it will be constantan
    subTotal,
    tax,
    shippingCharges,
    total,
  } = useSelector((state) => state.cart);

  const { cartItems: orderItems } = useSelector((state) => state.cart); //  cartItems  as name of orderItems 

  const dispatch = useDispatch();

  const increment = (item) => {
    switch (item) {
      case 1:
        dispatch({ type: "cheeseBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 2:
        dispatch({ type: "vegCheeseBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 3:
        dispatch({ type: "burgerWithFriesIncrement" });
        dispatch({ type: "calculatePrice" });
        break;

      default:
        dispatch({ type: "cheeseBurgerIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
    }
  };

  const decrement = (item) => {
    switch (item) {
      case 1:
        if (cheeseBurger === 0) break; // i do not want to order become negative
        dispatch({ type: "cheeseBurgerDecrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 2:
        if (vegCheeseBurger === 0) break;
        dispatch({ type: "vegCheeseBurgerDecrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 3:
        if (burgerWithFries === 0) break;
        dispatch({ type: "burgerWithFriesDecrement" });
        dispatch({ type: "calculatePrice" });
        break;

      default:
        if (cheeseBurger === 0) break;
        dispatch({ type: "cheeseBurgerDecrement" });
        dispatch({ type: "calculatePrice" });
        break;
    }
  };

  useEffect(() => { 
    localStorage.setItem("cartItems", JSON.stringify(orderItems)); // hear i want to store all cartItems data as name of orderItems 
    localStorage.setItem(
      "cartPrices",
      JSON.stringify({
        subTotal,
        tax,
        shippingCharges,
        total,
      })
    );
  }, [orderItems, subTotal, tax, shippingCharges, total]);

  return (
    <section className="cart">
      <main>
        {/* hear i through data of ({ value, title, img, increment, decrement })  which access from CartItem function to upper side */}
        <CartItem
          title={"Cheese Burger"}
          img={burger1}
          value={cheeseBurger}   // hear passed the real value which come from  line 31
          increment={() => increment(1)}  //   if  trigger   the  increment fun so only run increment(1) fun one  mean  case 1:   line 48
          decrement={() => decrement(1)}  // hear i mention only run  case 1: / cheeseBurger / increment fun 
        />
        <CartItem
          title={"Veg Cheese Burger"}
          img={burger2}
          value={vegCheeseBurger}  // hear passed the real value which come from line 32 
          increment={() => increment(2)}  
          decrement={() => decrement(2)}  
        />
        <CartItem
          title={"Cheese Burger with French Fries"}
          img={burger3}
          value={burgerWithFries}  // hear passed the real value which come from line 33
          increment={() => increment(3)}  
          decrement={() => decrement(3)}   
        />

        <article>
          <div>
            <h4>Sub Total</h4>
            <p>₹{subTotal}</p>
          </div>
          <div>
            <h4>Tax</h4>
            <p>₹{tax}</p>
          </div>
          <div>
            <h4>Shipping Charges</h4>
            <p>₹{shippingCharges}</p>
          </div>{" "}
          <div>
            <h4>Total</h4>
            <p>₹{total}</p>
{/* hear add new file  ./shipping.jsx*/}
          </div>
          <Link to="/shipping">Checkout</Link>
        </article>
      </main>
    </section>
  );
};

export default Cart;
