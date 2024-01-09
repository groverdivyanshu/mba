// // import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../redux/actions/user";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);






  return (
   
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <h3 style={{ padding: "2vmax" }}>
        BURGER KING 🍔
        </h3>




        
<CustomAvatar
  src={avatar}
  alt="User"
  size="10vmax"
  // className="avatar-border"
  // style={{
  //   borderRadius: '50%', // Makes it round
  //   border: '2px solid rgb(184, 144, 230)' // Replace #colorCode with the color you want
  // }}
/>

        {/* <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        /> */}
 
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/Login">
          <h5>Already Signed Up? Login Now</h5>
        </Link>

        <button disabled={loading} type="submit">
          Sign Up
        </button>  
      </form>
    </div>
  );
};



  // Custom style for the avatar image
  const CustomAvatar = ({ src, alt, size }) => {
    const avatarStyle = {
      height: size,
      width: size,
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid red'
    };
    return <img src={src} alt={alt} style={avatarStyle} />;
};

export default Register;





