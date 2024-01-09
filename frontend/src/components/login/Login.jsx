// import React from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { server } from "../../redux/store";
import React, { useEffect, useState } from "react";
import "./Login.css";
// import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/user";
import { useAlert } from "react-alert";
const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.auth);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    // if (message) {
    //   alert.success(message);
    //   dispatch({ type: "clearMessage" });
    // }
  }, [alert, error, dispatch]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <h3 style={{ padding: "2vmax" }}>
        BURGER KING 🍔
        </h3>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link> */}

        <button type="submit">Login</button>

        <Link to="/register">
          <h5>New User?</h5>
        </Link>
      </form>
    </div>
  );



























  //! burger app google login
  // const loginHandler = () => {
  //   window.open("http://localhost:4000/api/v1/googlelogin", "_self");
  // };

  // return (
  //   <section className="login">
  //     <motion.button
  //       initial={{ y: "-100vh" }}
  //       animate={{ y: 0 }}
  //       onClick={loginHandler} 
  //     >
  //       Login with Google
  //       <FcGoogle />
  //     </motion.button>
  //   </section>
  // );
};

export default Login;
