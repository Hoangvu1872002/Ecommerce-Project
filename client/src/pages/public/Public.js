import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader></TopHeader>
      <Header></Header>
      <Navigation></Navigation>
      <div className="w-main">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Public;
