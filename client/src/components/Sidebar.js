import React, { useEffect, useState } from "react";
import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../ultils/helper";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const {categories} = useSelector(state => state.app)
  return (
    <div className="flex flex-col border pb-2">
      {categories?.map((e) => (
        <NavLink
          key={createSlug(e.title)}
          to={createSlug(e.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm"
              : " px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {e.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
