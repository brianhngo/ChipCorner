import React, { useEffect } from "react";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import { useDispatch, useSelector } from "react-redux";

const TestPage = () => {
  return (
    <div id="container">
      <section id="headerSection">
        <header id="headerContainer">
          <div id="websiteTitle">
            <h3>The Chip Corner</h3>
            <img
              className="logoImage"
              src="https://media.istockphoto.com/id/164661881/vector/nachos-cartoon.jpg?s=612x612&w=0&k=20&c=AFnAYL79XMt0VQSVHtPRTuJUR1z0Iwig8LCzC3083Ag="
            />
          </div>
          <nav id="navContainer">
            <Navbar />
            <AppRoutes />
          </nav>
        </header>
      </section>

      <section id="footerSection">
        <p> Copyrights © 2023 All Rights Reserved. The Chip Corner </p>
        <p> Beetal Team </p>
      </section>
    </div>
  );
};

export default TestPage;
