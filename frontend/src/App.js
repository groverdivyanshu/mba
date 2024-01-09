import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentSuccess from "./components/cart/PaymentSuccess";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/profile/Profile";
import MyOrders from "./components/myOrders/MyOrders";
import OrderDetails from "./components/myOrders/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import About from "./components/about/About";
import NotFound from "./components/layout/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/user";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";

import "./styles/app.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/founder.scss";
import "./styles/menu.scss";
import "./styles/footer.scss";
import "./styles/contact.scss";
import "./styles/cart.scss";
import "./styles/shipping.scss";
import "./styles/confirmOrder.scss";
import "./styles/paymentsuccess.scss";
import "./styles/login.scss";
import "./styles/profile.scss";
import "./styles/table.scss";
import "./styles/orderDetails.scss";
import "./styles/dashboard.scss";
import "./styles/about.scss";

function App() {
  const dispatch = useDispatch(); //import { useDispatch, useSelector } from "react-redux";
  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  ); // state.auth come from  \src\redux\store.js\9
  //   loadUser for all data of user  
  useEffect(() => {
    dispatch(loadUser()); 
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);

  return (
    <Router>
      
      <Header isAuthenticated={isAuthenticated} /> 
       {/* by default nature isAuthenticated = flash show it on --> \src\components\layout\Header.jsx\8 & 27,29   if ir is true or directly    access isAuthenticated now only open  open  login page  */}
      <Routes> {/*  THIS  4 page  every one can be access without login so there are no use  protected-route-react package  */}
      {/* <Route path="/register" element={<Register />} /> */}
         <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
       
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
               {/* if user is already  login then redirect /me page  other wise login */}

{/* 
               <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
               <Route
          path="/register"
          element={isAuthenticated ? <About /> : <Register />} */}
        {/* /> */}


         <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
              <Login />
             </ProtectedRoute> 
          }
        />
        {/* <Route
          path="/register"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
              <Register />
             </ProtectedRoute>
          }
        /> */}
            {/* if log in mean isAuthenticated only then you access this page */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
           <Route path="/me" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirmorder" element={<ConfirmOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
         </Route> 
             {/* hear only admin then access but how i know is Admin so use -->  isAdmin={user && user.role === "admin"}  if role admin so  adminRoute={true} and you can access .     //! if you want to    make admin protected route so , --> adminRoute ={true} .  to check whether user is admin or not  -->  isAdmin={user && user.role === "admin"} */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"} // this user come from state.auth in   \src\redux\store.js\9   via     \controllers\user.js\9  via all details of user 
              redirectAdmin="/me"
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} /> 
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
