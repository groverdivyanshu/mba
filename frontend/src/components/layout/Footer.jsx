import React from "react";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div>
        <h2>BURGER KING 🍔</h2>

        <p>We are trying to give you the best taste possible.</p>
        <br />

        <em>We give attention to genuine feedback.</em>

        <strong>All right received @BURGER KING 🍔</strong>
      </div>

      <aside>
        <h4>Follow Us</h4>

        <a href="https://youtube.com/">
          <AiFillYoutube />
        </a>
        <a href="https://instagram.com/">
          <AiFillInstagram />
        </a>
        <a href="https://github.com/">
          <AiFillGithub />
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
