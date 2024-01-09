import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Header = ({ isAuthenticated = false }) => {
  return (
    <nav>
      {/* add animation on nav bar icon */}
      <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }}>
        <IoFastFoodOutline />
      </motion.div>

      {/* link to all pages */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">
          {/* add Shopping  Cart icon */}
          <FiShoppingCart />
        </Link>

        {/* if user is Authenticated so go to /me page (user page) otherwise go to log in page  */}
        <Link to={isAuthenticated ? "/me":"/login"}>
          {/* add icon base on  Authenticated or not*/}
          {isAuthenticated ? <FaUser /> : <FiLogIn />}
        </Link>
        
      </div>
    </nav>
  );
};

export default Header;
