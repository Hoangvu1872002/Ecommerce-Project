import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>;
  return (
    <div>
      Member
      <Outlet></Outlet>
    </div>
  );
};

export default MemberLayout;
